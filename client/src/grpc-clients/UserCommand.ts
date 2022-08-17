import {UserResponse} from "../../proto/userPackage/UserResponse";
import {UserClient} from "../../proto/userPackage/User";

export class UserCommand {
    private _userClient: UserClient;

    constructor(userClient: UserClient) {
        this._userClient = userClient;
    }

    public async getUser(userId: string): Promise<UserResponse> {
        return new Promise((resolve, reject) => {
            this._userClient.getUser({ userId }, (err, respond) => {
                if (err) {
                    reject(err.details);
                } else if ( respond?.name && respond?.role) {
                    const user = {
                        name: respond.name,
                        role: respond.role
                    }
                    resolve(user);
                } else {
                    reject("User not found!");
                }
            });
        });
    }
}

export default UserCommand;
