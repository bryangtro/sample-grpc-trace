// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { UserId as _userPackage_UserId, UserId__Output as _userPackage_UserId__Output } from '../userPackage/UserId';
import type { UserResponse as _userPackage_UserResponse, UserResponse__Output as _userPackage_UserResponse__Output } from '../userPackage/UserResponse';

export interface UserClient extends grpc.Client {
  GetUser(argument: _userPackage_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserId, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, callback: grpc.requestCallback<_userPackage_UserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserHandlers extends grpc.UntypedServiceImplementation {
  GetUser: grpc.handleUnaryCall<_userPackage_UserId__Output, _userPackage_UserResponse>;
  
}

export interface UserDefinition extends grpc.ServiceDefinition {
  GetUser: MethodDefinition<_userPackage_UserId, _userPackage_UserResponse, _userPackage_UserId__Output, _userPackage_UserResponse__Output>
}
