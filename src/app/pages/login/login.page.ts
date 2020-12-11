import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthenticationRequest } from 'src/app/models/authentication/authenticationRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommomService } from 'src/app/services/commom.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { StatusbarService } from 'src/app/services/statusbar.service';

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
    private menuCtrl: MenuController,
    private statusBarService: StatusbarService
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
    const isValid = this.isValid();

    if (!(isValid === '')) {
      this.commomService.hideLoading();
      this.commomService.presentToastError(isValid);
      return;
    }

    document.dispatchEvent(new CustomEvent('sk-chase:show'));

    this.authenticationService.login(this.authenticationRequest)
      .pipe(finalize(() => { document.dispatchEvent(new CustomEvent('sk-chase:hide')); }))
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
    this.statusBarService.changeBackgroundStatusBar('#FFF', true);
  }

  closeLoginWithEmail(): void {
    this.changeSlides(false, 0);
    this.statusBarService.changeBackgroundStatusBar('#EEF3FF', true);
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
