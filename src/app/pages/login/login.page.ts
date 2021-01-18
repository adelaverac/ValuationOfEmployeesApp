import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthenticationRequest } from 'src/app/interfaces/authentication/authenticationRequest';
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

  authenticationRequest = {} as AuthenticationRequest;

  isLoginWithEmail = false;
  showPassword = false;
  passwordToggleIcon = 'eye-outline';

  constructor(
    private commomService: CommomService,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private navController: NavController,
    private menuController: MenuController,
    private statusBarService: StatusbarService
  ) { }

  ngOnInit() {
    this.statusBarService.changeBackgroundStatusBar('#FFF', true);
    this.initValues();
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordToggleIcon = 'eye-outline';
    }
  }

  login() {
    const isValid = this.isValid();

    if (!(isValid === '')) {
      this.commomService.presentToastError(isValid);
      return;
    }

    this.commomService.showLoadingCustom();

    this.authenticationService.login(this.authenticationRequest)
      .pipe(finalize(() => { this.commomService.hideLoadingCustom(); }))
      .subscribe(result => {
        const { token, user, level, message } = result;
        if (!(level === 'SUCCESS')) {
          this.commomService.presentToastError(message);
          return;
        }

        this.localStorageService.setToken(token);
        this.menuController.enable(true);
        this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
      }, err => {
        this.commomService.presentToastError(err);
      }, () => this.commomService.hideLoadingCustom());
  }

  closeLoginWithEmail(): void {
    this.navController.navigateRoot('/welcome', { animated: true });
  }

  createAccount(): void {
    this.navController.navigateRoot('/createAccount', { animated: true });
  }

  private isValid(): string {
    if (this.authenticationRequest.email === '') {
      return 'Ingrese su correo';
    }

    if (this.authenticationRequest.password === '') {
      return 'Ingrese su contraseña';
    }

    return '';
  }

  private initValues(): void {
    this.setAuthenticationRequestNull();
  }

  private setAuthenticationRequestNull(): void {
    this.authenticationRequest.email = '';
    this.authenticationRequest.password = '';
  }

}
