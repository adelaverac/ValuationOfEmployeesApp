import { Injectable } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Injectable({
  providedIn: "root",
})
export class StatusbarService {
  constructor(private _statusBar: StatusBar) { }

  changeBackgroundStatusBar(color: string) {
    let styleDefault: boolean;
    switch (color) {
      case "white":
        styleDefault = true;
        this._statusBar.backgroundColorByHexString("#fff");
        break;
      case "black":
        styleDefault = false;
        this._statusBar.backgroundColorByHexString("#000");
        break;
    }

    if (styleDefault) this._statusBar.styleDefault();
    else this._statusBar.styleLightContent();
  }
}
