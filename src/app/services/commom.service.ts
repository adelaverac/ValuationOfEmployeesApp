import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Injectable({
    providedIn: 'root'
})
export class CommomService {

    isLoading = false;

    constructor(
        private _toastCtrl: ToastController,
        private _spinnerDialog: SpinnerDialog,
        private _loadingCtrl: LoadingController) { }

    async presentToastSuccess(message: string) {
        const toast = await this._toastCtrl.create({
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
        const toast = await this._toastCtrl.create({
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
        const toast = await this._toastCtrl.create({
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
        const toast = await this._toastCtrl.create({
            message,
            position: 'bottom',
            duration: 5000,
            color: 'dark',
            animated: true,
            mode: 'ios'
        });
        toast.present();
    }



    showSpinnerDialog(message?: string) {
        this._spinnerDialog.show(message);
    }

    hideSpinnerDialog() {
        this._spinnerDialog.hide();
    }

    async showLoading(message?: string) {
        this.isLoading = true;
        return await this._loadingCtrl.create({
            message,
            animated: true,
            backdropDismiss: false,
            mode: 'ios',
            showBackdrop: true
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss();
                }
            });
        });
    }

    // async hideLoading() {
    //     this.isLoading = false;
    //     return await this._loadingCtrl.dismiss();
    // }

    showLoadingCustom(): void {
        document.dispatchEvent(new CustomEvent('sk-chase:show'));
    }

    hideLoadingCustom(): void {
        document.dispatchEvent(new CustomEvent('sk-chase:hide'));
    }
}