import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() showAvatar: boolean;
  @Input() showNotification: boolean;

  constructor() { }

  ngOnInit() { }

}
