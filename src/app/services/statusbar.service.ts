import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root',
})
export class StatusbarService {
  constructor(private statusBar: StatusBar) { }

  // TRUE: Color Default (Black)
  // FALSE: Color Ligth (White)
  changeBackgroundStatusBar(colorHexadecimal: string, statusBarFontColor: boolean) {
    this.statusBar.backgroundColorByHexString(colorHexadecimal);

    if (statusBarFontColor) {
      this.statusBar.styleDefault();
    }
    else {
      this.statusBar.styleLightContent();
    }
  }
}
