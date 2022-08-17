// @ts-ignore
import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import * as appInsight from "applicationinsights";
import api, {SpanStatusCode} from "@opentelemetry/api";

import container from "./database";
import tracer from "./tracer";
import {RoleHandlers} from "../proto/rolePackage/Role";
import {ProtoGrpcType} from "../proto/role";
import {RoleResponse} from "../proto/rolePackage/RoleResponse";
import {RoleRequest} from "../proto/rolePackage/RoleRequest";

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

const PORT = 8002
const PROTO_FILE = '../proto/role.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
const rolePackage = grpcObj.rolePackage

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

const roleServer: RoleHandlers = {
    GetRoleDescription: async function (
        req: grpc.ServerUnaryCall<RoleRequest, RoleResponse>,
        res: grpc.sendUnaryData<RoleResponse>
    ) {
        const roleTitle = req.request.roleTitle ?? "";
        const span = tracer.startSpan(`RoleService:GetRoleDescription(${roleTitle})`);

        try {
            const {resource: dbResult} = await container.item(roleTitle, roleTitle).read();
            span.setStatus({code: SpanStatusCode.OK});

            if (dbResult) return res(null, { roleDescription: dbResult.roleDescription})
            return res(null, {roleDescription: ""})

        } catch (e) {
            console.log(e)
            span.setStatus({
                code: SpanStatusCode.ERROR
            });
        } finally {
            span.end()
        }
    }
}

function getServer() {
    const server = new grpc.Server()
    server.addService(rolePackage.Role.service, roleServer)
    return server
}

main()