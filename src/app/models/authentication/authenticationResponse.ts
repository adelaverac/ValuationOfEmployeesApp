import { UserViewModel } from '../users/userViewModel';

export class AuthenticationResponse {
    public token: string = '';
    public userViewModel: UserViewModel;
}