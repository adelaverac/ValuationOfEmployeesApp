import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { Observable, timer } from "rxjs";
import { Navigation } from './interfaces/nav/navigation';
import { NavigationService } from './services/navigation.service';
import { StatusbarService } from "./services/statusbar.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {

  navigations: Observable<Navigation[]>;

  constructor(
    private platform: Platform,
    private _statusBarService: StatusbarService,
    private _navigationService: NavigationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this._statusBarService.changeBackgroundStatusBar("black");
      const splash: HTMLElement = document.getElementById("splash");
      timer(5000).subscribe(() => {
        this._statusBarService.changeBackgroundStatusBar("white");
        splash.style.display = "none";
      });

      this.loadMenuOptions();
    });
  }

  loadMenuOptions(): void {
    this.navigations = this._navigationService.getAll();
  }


}
