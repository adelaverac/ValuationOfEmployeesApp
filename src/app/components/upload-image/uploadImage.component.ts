import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'upload-image',
    templateUrl: './uploadImage.component.html'
})
export class UploadImage implements OnInit {

    constructor(
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() { }

    getFile(event: any): void {
        if (!(event.target.files.length > 0)) {
            return;
        }

        const file = event.target.files[0];
        this.extractBase64(file).then(image => {
            console.log(image);
        });
    }

    private extractBase64 = async ($event: any) => new Promise((resolve, reject) => {
        try {
            const unsafeImg = window.URL.createObjectURL($event);
            const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
            const reader = new FileReader();
            reader.readAsDataURL($event);
            reader.onload = () => {
                resolve({
                    base: reader.result
                });
            };
            reader.onerror = error => {
                resolve({
                    base: null
                });
            };
        } catch (e) {
            return null;
        }
    })

}
