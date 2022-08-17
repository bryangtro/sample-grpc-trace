import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {ProtoGrpcType} from "../../proto/user";

const PROTO_FILE = `../../proto/user.proto`;
const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const userClient = new grpcObject.userPackage.User(
    `0.0.0.0:8001`,

    grpc.credentials.createInsecure(),
);

console.log("Connected to User Service");

export default userClient;
