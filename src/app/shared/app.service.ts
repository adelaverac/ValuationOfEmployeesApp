import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class AppServiceBase {

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Allow-Headers': 'origin, x-requested-with',
        })
    };

    constructor() { }

    // Error handling
    errorHandl(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message; // Get client-side error
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; // Get server-side error
        }
        return throwError(errorMessage);
    }

}