import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserClient as _userPackage_UserClient, UserDefinition as _userPackage_UserDefinition } from './userPackage/User';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  userPackage: {
    User: SubtypeConstructor<typeof grpc.Client, _userPackage_UserClient> & { service: _userPackage_UserDefinition }
    UserRequest: MessageTypeDefinition
    UserResponse: MessageTypeDefinition
  }
}

