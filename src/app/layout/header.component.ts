import {Component, OnInit} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IfAuthenticatedDirective} from '../directives/if-authenticated.directive';
import {UserService} from '../service/user.service';


@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  imports: [
    RouterLinkActive,
    RouterLink,
    IfAuthenticatedDirective,
  ],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}
