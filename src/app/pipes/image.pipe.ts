import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'image'
})
export class ImagePipe implements PipeTransform {

    transform(img: string, size: string = 'w500'): string {
        if (!img) {
            return;
        }
        return "";
    }

}