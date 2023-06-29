import { Component , Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'globex-web';
  
  currentRoute: string;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId:string) {
    var isBrowser = isPlatformBrowser(platformId);
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            // Hide progress spinner or progress bar
            this.currentRoute = event.url;       
            if(isBrowser) {
              localStorage.setItem('redirect', JSON.stringify(this.currentRoute));   
            }
        }
    });
  }
}