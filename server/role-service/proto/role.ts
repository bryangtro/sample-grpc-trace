import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { RoleClient as _rolePackage_RoleClient, RoleDefinition as _rolePackage_RoleDefinition } from './rolePackage/Role';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rolePackage: {
    Role: SubtypeConstructor<typeof grpc.Client, _rolePackage_RoleClient> & { service: _rolePackage_RoleDefinition }
    RoleRequest: MessageTypeDefinition
    RoleResponse: MessageTypeDefinition
  }
}

