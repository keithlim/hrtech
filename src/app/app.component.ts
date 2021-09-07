import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // for the setting of the side menu / mat-sidenav
  public opened = true;

  ngOnInit() {
    window.innerWidth < 768 ? this.opened = false : this.opened = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth < 768 ? this.opened = false : this.opened = true;
  }

  public isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 768;
  }

}
