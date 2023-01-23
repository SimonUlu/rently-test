import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { SupabaseService } from './services/supabase-default.service'
import { Location } from '@angular/common';

interface Page {
  title: string;
  identifier: string;
  icon_name: string;
  router_link: string;
  sub_pages?: any;
  is_accordion: boolean;
  accordion_open: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-user-management';
  pages: Page[] = [];
  loggedIn: boolean = false;
  urls_sidenav_hidden = ['/login', '/register'];

  display_sidenav: boolean = true;

  session = this.supabase.session

  constructor(private readonly supabase: SupabaseService, private router: Router, private location: Location) {
    this.router.events.subscribe(async (ev) => {
        // Hide sidenav for pages
        if (this.urls_sidenav_hidden.includes(this.location.path())) {
          this.display_sidenav = false;
        } else {
          this.display_sidenav = true;
        }
      }
    )
  }



  async ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
    const isSignedIn = !!(await this.supabase.getSession())?.user;
    if (isSignedIn) {
      this.loggedIn = true;
    }
    await this.loadNav();
  }

  async loadNav() {
    this.pages = [
      {
        title: "Dashboard",
        identifier: 'customer-management',
        icon_name: 'office-building',
        router_link: '/dashboard',
        is_accordion: false,
        accordion_open: false
      },
      {
        title: "Angebote",
        identifier: 'customer-management',
        icon_name: 'office-building',
        router_link: '/dashboard',
        is_accordion: false,
        accordion_open: false
      },
      {
        title: "Inserieren",
        identifier: 'customer-management',
        icon_name: 'office-building',
        router_link: '/dashboard',
        is_accordion: false,
        accordion_open: false
      }
    ]
  }
  toggleSubpages(
    is_accordion: boolean,
    identifier: string,
  ) {
    if (is_accordion) {
      let target = this.pages.filter(
        (page) => page.identifier === identifier
      )[0];
      target.accordion_open = target.accordion_open === true ? false : true;
    }
  }
}
