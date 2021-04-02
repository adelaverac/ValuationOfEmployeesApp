import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Injectable({
    providedIn: 'root'
})
export class CommomService {

    isLoading = false;

    constructor(
        private toastCtrl: ToastController,
        private spinnerDialog: SpinnerDialog,
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

    showSpinnerDialog(message?: string) {
        this.spinnerDialog.show(message);
    }

    hideSpinnerDialog() {
        this.spinnerDialog.hide();
    }

    async showLoading(message?: string) {
        this.isLoading = true;
        return await this.loadingCtrl.create({
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

    showLoadingCustom(): void {
        document.dispatchEvent(new CustomEvent('sk-chase:show'));
    }

    hideLoadingCustom(): void {
        document.dispatchEvent(new CustomEvent('sk-chase:hide'));
    }
}