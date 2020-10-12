import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides, NavController } from "@ionic/angular";
import { AuthenticationRequest } from 'src/app/models/authentication/authenticationRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommomService } from 'src/app/services/commom.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: [
    "./styles/login.page.scss",
    "./styles/login.shell.scss",
    "./styles/login.responsive.scss",
  ],
})
export class LoginPage implements OnInit {

  @ViewChild('slideLogin', { static: true }) slides: IonSlides;

  authenticationRequest: AuthenticationRequest;

  showPassword = false;
  passwordToggleIcon = "eye-outline";
  constructor(
    private _commomService: CommomService,
    private _authenticationService: AuthenticationService,
    private _localStorageService: LocalStorageService,
    private _navCtrl: NavController
  ) {
    this.authenticationRequest = new AuthenticationRequest();
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == "eye-outline") {
      this.passwordToggleIcon = "eye-off-outline";
    } else {
      this.passwordToggleIcon = "eye-outline";
    }
  }

  async login() {
    this._commomService.showLoading('Iniciando sesión...');
    const isValid = this.isValid();
    if (isValid == '') {
      this._authenticationService.login(this.authenticationRequest)
        .subscribe(res => {
          const { token, userViewModel, level, messageResponse } = res;
          if (level === 'SUCCESS') {
            this._localStorageService.setToken(token);
            this._navCtrl.navigateRoot('/tabs', { animated: true });
          } else {
            this._commomService.presentToastError(messageResponse);
          }
        }, err => {
          this._commomService.hideLoading()
          this._commomService.presentToastError(err);
        }, () => this._commomService.hideLoading());
    } else {
      this._commomService.hideLoading();
      this._commomService.presentToastError(isValid);
    }
  }

  isValid(): string {
    if (this.authenticationRequest.email == '') {
      return "Ingrese su correo";
    } else if (this.authenticationRequest.password == '') {
      return "Ingrese su contraseña";
    }
    return "";
  }

}
