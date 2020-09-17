import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
showPassword = false;
passwordToggleIcon = 'eye-outline';
  constructor() { }
  togglePassword():void{
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye-outline'){
      this.passwordToggleIcon = 'eye-off-outline';
    } else{
      this.passwordToggleIcon = 'eye-outline'
    }
  }

  ngOnInit() {
  }

}
