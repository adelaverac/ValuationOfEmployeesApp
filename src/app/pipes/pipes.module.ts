import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { ImagePipe } from './image.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    ImagePipe
  ],
  exports: [
    FilterPipe,
    ImagePipe
  ]
})
export class PipesModule { }
