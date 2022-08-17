// Original file: proto/role.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { RoleRequest as _rolePackage_RoleRequest, RoleRequest__Output as _rolePackage_RoleRequest__Output } from '../rolePackage/RoleRequest';
import type { RoleResponse as _rolePackage_RoleResponse, RoleResponse__Output as _rolePackage_RoleResponse__Output } from '../rolePackage/RoleResponse';

export interface RoleClient extends grpc.Client {
  GetRoleDescription(argument: _rolePackage_RoleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  GetRoleDescription(argument: _rolePackage_RoleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  GetRoleDescription(argument: _rolePackage_RoleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  GetRoleDescription(argument: _rolePackage_RoleRequest, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  getRoleDescription(argument: _rolePackage_RoleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  getRoleDescription(argument: _rolePackage_RoleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  getRoleDescription(argument: _rolePackage_RoleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  getRoleDescription(argument: _rolePackage_RoleRequest, callback: grpc.requestCallback<_rolePackage_RoleResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface RoleHandlers extends grpc.UntypedServiceImplementation {
  GetRoleDescription: grpc.handleUnaryCall<_rolePackage_RoleRequest__Output, _rolePackage_RoleResponse>;
  
}

export interface RoleDefinition extends grpc.ServiceDefinition {
  GetRoleDescription: MethodDefinition<_rolePackage_RoleRequest, _rolePackage_RoleResponse, _rolePackage_RoleRequest__Output, _rolePackage_RoleResponse__Output>
}
