// @ts-ignore
import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import * as appInsight from "applicationinsights";
import api, {SpanStatusCode} from "@opentelemetry/api";

import container from "./database";
import {ProtoGrpcType} from '../proto/user'
import {UserHandlers} from "../proto/userPackage/User";
import {UserId} from "../proto/userPackage/UserId";
import {UserResponse} from '../proto/userPackage/UserResponse';
import tracer from "./tracer";

appInsight
    .setup(process.env.APPLICATION_INSIGHTS_CONNECTION_STRING)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setSendLiveMetrics(true)
    .setDistributedTracingMode(appInsight.DistributedTracingModes.AI_AND_W3C)
    .start();

console.log("Server file ran!!")
const PORT = 8001
const PROTO_FILE = '../proto/user.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
const userPackage = grpcObj.userPackage

function main() {
    const server = getServer()

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(`Your server as started on port ${port}`)
            server.start()
        })
}

const userServer: UserHandlers = {
    GetUser: async function (
        req: grpc.ServerUnaryCall<UserId, UserResponse>,
        res: grpc.sendUnaryData<UserResponse>
    ) {
        const span = tracer.startSpan("UserService:GetUser()");
        api.trace.setSpan(api.context.active(), span);

        const userId = req.request.userId ?? "";

        try {
            console.log("SayHello has been called!!")

            const {resource: dbResult} = await container.item(userId, userId).read();
            span.setStatus({code: SpanStatusCode.OK});

            if (dbResult) return res(null, {username: dbResult.username, job: dbResult.job})
            return res(null, {username: "", job: ""})

        } catch (e) {
            console.log(e)
            span.setStatus({
                code: SpanStatusCode.ERROR,
                message: e,
            });
        } finally {
            span.end()
        }

    }
}

function getServer() {
    const server = new grpc.Server()
    server.addService(userPackage.User.service, userServer)
    return server
}

main()