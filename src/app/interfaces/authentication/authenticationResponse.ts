import { BasicResponse } from '../commom/basicResponse';
import { User } from '../users/user';

export interface AuthenticationResponse extends BasicResponse {
    token: string;
    user: User;
}