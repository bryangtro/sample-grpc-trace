// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { UserRequest as _userPackage_UserRequest, UserRequest__Output as _userPackage_UserRequest__Output } from '../userPackage/UserRequest';
import type { UserResponse as _userPackage_UserResponse, UserResponse__Output as _userPackage_UserResponse__Output } from '../userPackage/UserResponse';

export interface UserClient extends grpc.Client {
  GetUser(argument: _userPackage_UserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserRequest, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserRequest, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserHandlers extends grpc.UntypedServiceImplementation {
  GetUser: grpc.handleUnaryCall<_userPackage_UserRequest__Output, _userPackage_UserResponse>;
  
}

export interface UserDefinition extends grpc.ServiceDefinition {
  GetUser: MethodDefinition<_userPackage_UserRequest, _userPackage_UserResponse, _userPackage_UserRequest__Output, _userPackage_UserResponse__Output>
}
