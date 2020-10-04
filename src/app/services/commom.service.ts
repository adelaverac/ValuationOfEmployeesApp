import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CommomService {

    isLoading = false;

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController) { }

    async presentToastSuccess(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            position: 'top',
            duration: 3000,
            color: 'success',
            animated: true,
            mode: 'ios',
            buttons: [
                {
                    side: 'end',
                    icon: 'checkmark-outline',
                }
            ]
        });
        toast.present();
    }

    async presentToastWarning(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            position: 'top',
            duration: 5000,
            color: 'warning',
            animated: true,
            mode: 'ios',
            buttons: [
                {
                    side: 'end',
                    icon: 'close-outline',
                }
            ]
        });
        toast.present();
    }

    async presentToastError(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            position: 'top',
            duration: 5000,
            color: 'danger',
            animated: true,
            mode: 'ios',
            buttons: [
                {
                    side: 'end',
                    icon: 'close-outline',
                }
            ]
        });
        toast.present();
    }

    async presentToastDark(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            position: 'bottom',
            duration: 5000,
            color: 'dark',
            animated: true,
            mode: 'ios'
        });
        toast.present();
    }

}