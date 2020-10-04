import { BasicResponse } from '../basicResponse';
import { UserViewModel } from '../users/userViewModel';

export class AuthenticationResponse extends BasicResponse {
    public token: string = '';
    public userViewModel: UserViewModel;
}