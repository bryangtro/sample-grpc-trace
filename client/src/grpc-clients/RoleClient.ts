import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {ProtoGrpcType} from "../../proto/role";

const PROTO_FILE = `../../proto/role.proto`;
const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const roleClient = new grpcObject.rolePackage.Role(
    `0.0.0.0:8002`,

    grpc.credentials.createInsecure(),
);

console.log("Connected to Role Service");

export default roleClient;
