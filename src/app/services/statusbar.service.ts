import { Injectable } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Injectable({
  providedIn: "root",
})
export class StatusbarService {
  constructor(private statusBar: StatusBar) {}

  changeBackgroundStatusBar(color: string) {
    let styleDefault: boolean;
    switch (color) {
      case "white":
        styleDefault = true;
        this.statusBar.backgroundColorByHexString("#fff");
        break;
      case "black":
        styleDefault = false;
        this.statusBar.backgroundColorByHexString("#000");
        break;
    }

    if (styleDefault) this.statusBar.styleDefault();
    else this.statusBar.styleLightContent();
  }
}
