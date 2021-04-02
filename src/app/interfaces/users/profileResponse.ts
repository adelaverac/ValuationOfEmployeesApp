import { BasicResponse } from '../commom/basicResponse';
import { CreateOrEditUser } from './createOrEditUser';

export interface ProfileResponse extends BasicResponse {
    user: CreateOrEditUser;
}
