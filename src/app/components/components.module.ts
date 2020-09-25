import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { IonicModule } from "@ionic/angular";
import { SplashComponent } from "./splash/splash.component";
import { ImageShellComponent } from "./shell/image-shell/image-shell.component";
import { AspectRatioComponent } from "./shell/aspect-ratio/aspect-ratio.component";

@NgModule({
  declarations: [
    HeaderComponent,
    SplashComponent,
    ImageShellComponent,
    AspectRatioComponent,
  ],
  exports: [
    HeaderComponent,
    SplashComponent,
    ImageShellComponent,
    AspectRatioComponent,
  ],
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
