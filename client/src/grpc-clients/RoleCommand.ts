import {RoleClient} from "../../proto/rolePackage/Role";
import {RoleResponse} from "../../proto/rolePackage/RoleResponse";

export class RoleCommand {
    private _roleClient: RoleClient;

    constructor(roleClient: RoleClient) {
        this._roleClient = roleClient;
    }

    public async getRoleDescription(roleTitle: string): Promise<RoleResponse> {
        return new Promise((resolve, reject) => {
            this._roleClient.getRoleDescription({ roleTitle }, (err, respond) => {
                if (err) {
                    reject(err.details);
                } else if (respond?.roleDescription) {
                    const roleDescription = {
                        roleDescription: respond.roleDescription
                    }
                    resolve(roleDescription);
                } else {
                    reject("Role not found!");
                }
            });
        });
    }
}

export default RoleCommand;
