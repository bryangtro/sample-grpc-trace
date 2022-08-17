import Router from "@koa/router";
import { api } from "@opentelemetry/sdk-node";
import RoleCommand from "../../grpc-clients/RoleCommand";
import roleClient from "../../grpc-clients/RoleClient";
import UserCommand from "../../grpc-clients/UserCommand";
import userClient from "../../grpc-clients/UserClient";
import {UserResponse} from "../../../proto/userPackage/UserResponse";
import tracer from "../../tracer";

const router = new Router({
    prefix: "/api/users",
});


// This is a GET Route that provides the user's detail, including the role description
router.get("/:userId", async (ctx, next) => {
    const { userId } = ctx.params

    const userClientCommand = new UserCommand(userClient)
    const roleClientCommand = new RoleCommand(roleClient)

    const span = tracer.startSpan(`GET /api/users/${userId}`);
    const spanContext = api.trace.setSpan(api.context.active(), span);

    try {
        const user: UserResponse = await api.context.with(spanContext, async () => {
            return await userClientCommand.getUser(userId)
        });
        const roleDescription = await api.context.with(spanContext, async () => {
            const role = user.role ?? "";
            return await roleClientCommand.getRoleDescription(role);
        })

        const userDetails = {
            name: user.name,
            role: user.role,
            roleDescription: roleDescription.roleDescription
        }

        ctx.body = userDetails;
    } catch (error) {
        const messageResponse = {
            message: error as string,
        };
        ctx.status = 404;
        ctx.body = messageResponse;
        throw new Error(messageResponse.message);
    } finally {
        span.end();
    }
});

export default router;
