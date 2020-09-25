import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { timer } from "rxjs";
import { StatusbarService } from "./services/statusbar.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBarService: StatusbarService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBarService.changeBackgroundStatusBar("black");
      const splash: HTMLElement = document.getElementById("splash");
      timer(5000).subscribe(() => {
        this.statusBarService.changeBackgroundStatusBar("white");
        splash.style.display = "none";
      });
    });
  }
}
