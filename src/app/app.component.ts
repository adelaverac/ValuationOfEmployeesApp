import { Component } from '@angular/core';

import { MenuController, NavController, Platform } from '@ionic/angular';
import { Observable, timer } from 'rxjs';
import { elementAt, finalize } from 'rxjs/operators';
import { LogoutRequest } from './interfaces/authentication/logoutRequest';
import { Navigation } from './interfaces/nav/navigation';
import { DataProvider } from './providers/data.provider';
import { AuthenticationService } from './services/authentication.service';
import { CommomService } from './services/commom.service';
import { LocalStorageService } from './services/localStorage.service';
import { NavigationService } from './services/navigation.service';
import { StatusbarService } from './services/statusbar.service';
import { AppComponentBase } from './shared/app.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  navigations: Navigation[];
  isLogout: boolean;

  constructor(
    private platform: Platform,
    private navController: NavController,
    private menuController: MenuController,
    private statusBarService: StatusbarService,
    private navigationService: NavigationService,
    private commomService: CommomService,
    private authenticationService: AuthenticationService,
    public dataProvider: DataProvider,
    private localStorageService: LocalStorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBarService.changeBackgroundStatusBar('#000', false);
      // const splash: HTMLElement = document.getElementById('splash');
      // timer(5000).subscribe(() => {
      //   this.statusBarService.changeBackgroundStatusBar('#EEF3FF', true);
      //   splash.style.display = 'none';
      // });
      this.statusBarService.changeBackgroundStatusBar('#EEF3FF', true);
      this.loadMenuOptions();
      this.validateUserDataInStorage();
    });
  }

  logout(): void {
    if (!this.dataProvider.state) {
      this.menuController.enable(false);
      this.localStorageService.clearStorage();
      this.navController.navigateRoot('/login', { animated: true });
      return;
    }

    this.unselectedOptions();
    this.commomService.showLoadingCustom();

    const logoutRequest = {} as LogoutRequest;
    const { idUser, idSession } = this.dataProvider.userData;
    logoutRequest.idUser = idUser;
    logoutRequest.idSession = idSession;

    this.authenticationService.logout(logoutRequest)
      .pipe(finalize(() => { this.commomService.hideLoadingCustom(); }))
      .subscribe(result => {
        const { level, message } = result;
        if (!(level === 'SUCCESS')) {
          this.commomService.presentToastError(message);
          return;
        }

        this.localStorageService.clearStorage();
        this.dataProvider.destroyData();
        this.menuController.enable(false);
        this.navController.navigateRoot('/login', { animated: true });
      }, err => this.commomService.presentToastError(JSON.stringify(err)));
  }

  optionClick(id): void {
    this.isLogout = false;
    this.navigations.forEach(element => {
      if (element.id === id) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
  }

  private unselectedOptions(): void {
    this.navigations.forEach(element => { element.selected = false; });
    this.isLogout = true;
  }

  private loadMenuOptions(): void {
    this.navigationService.getAll().subscribe(result => {
      this.navigations = result;
    });
  }

  private validateUserDataInStorage(): void {
    this.localStorageService.getUserData()
      .then(userData => {
        if (userData) {
          this.menuController.enable(true);
          this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
        } else {
          this.menuController.enable(false);
          this.navController.navigateRoot('/login', { animated: true });
        }
      });
  }
}
