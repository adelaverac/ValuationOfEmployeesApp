import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController, NavController } from '@ionic/angular';
import { AuthenticationRequest } from 'src/app/models/authentication/authenticationRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommomService } from 'src/app/services/commom.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss',
    './styles/login.shell.scss',
    './styles/login.responsive.scss',
  ],
})
export class LoginPage implements OnInit {

  @ViewChild('slideLogin', { static: true }) slides: IonSlides;

  authenticationRequest: AuthenticationRequest;

  isLoginWithEmail = false;
  showPassword = false;
  passwordToggleIcon = 'eye-outline';
  constructor(
    private commomService: CommomService,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {
    this.authenticationRequest = new AuthenticationRequest();
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordToggleIcon = 'eye-outline';
    }
  }

  async login() {
    this.commomService.showLoading('Iniciando sesión...');
    const isValid = this.isValid();

    if (!(isValid === '')) {
      this.commomService.hideLoading();
      this.commomService.presentToastError(isValid);
      return;
    }

    this.authenticationService.login(this.authenticationRequest)
      .subscribe(result => {
        const { token, userViewModel, level, messageResponse } = result;
        if (!(level === 'SUCCESS')) {
          this.commomService.presentToastError(messageResponse);
          return;
        }

        this.localStorageService.setToken(token);
        this.menuCtrl.enable(true);
        this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
      }, err => {
        this.commomService.hideLoading();
        this.commomService.presentToastError(err);
      }, () => this.commomService.hideLoading());
  }

  isValid(): string {
    if (this.authenticationRequest.email === '') {
      return 'Ingrese su correo';
    }

    if (this.authenticationRequest.password === '') {
      return 'Ingrese su contraseña';
    }

    return '';
  }

  loginWithEmail(): void {
    this.changeSlides(true, 1);
  }

  closeLoginWithEmail(): void {
    this.changeSlides(false, 0);
  }

  changeSlides(isLoginWithEmail: boolean, indexSlide: number): void {
    this.setAuthenticationRequestNull();
    this.isLoginWithEmail = isLoginWithEmail;
    this.slides.lockSwipes(false);
    this.slides.slideTo(indexSlide);
    this.slides.lockSwipes(true);
  }

  setAuthenticationRequestNull(): void {
    this.authenticationRequest.email = '';
    this.authenticationRequest.password = '';
  }

}
