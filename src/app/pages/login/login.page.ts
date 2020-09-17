import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
passwordToggleIcon = 'eye-outline';
  constructor(public alertController: AlertController) { }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recupera tu contraseña',
      message: 'Ingrese su correo',
      inputs: [
        {
          name: 'correo',
          type: 'email',
          placeholder: 'Correo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log(' Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log(' Ok');
          }
        }
      ]
    });

    await alert.present();
  }
  togglePassword():void{
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye-outline'){
      this.passwordToggleIcon = 'eye-off-outline';
    } else{
      this.passwordToggleIcon = 'eye-outline'
    }
  }

  ngOnInit() {
  }

}
