import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NavController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataProvider } from '../providers/data.provider';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private navController: NavController
    ) { }

    intercept(req, next) {
        let request = req;

        const dataProvider = this.injector.get(DataProvider);
        if (dataProvider.token) {
            request = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${dataProvider.token}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log('Status');
                console.log(JSON.stringify(err));

                // TODO: Controlar cuando la solicitud http no esta autorizada
                if (err.status === 401) {
                    // limpiar cache cuando ya no es valido el token
                    // this.navController.navigateRoot('/login', { animated: true });
                }

                return throwError(err);

            })
        );
    }
}