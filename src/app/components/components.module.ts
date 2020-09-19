import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { IonicModule } from "@ionic/angular";
import { SplashComponent } from "./splash/splash.component";

@NgModule({
  declarations: [HeaderComponent, SplashComponent],
  exports: [HeaderComponent, SplashComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
