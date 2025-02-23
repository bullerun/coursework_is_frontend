import {Component, OnInit} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {IfAuthenticatedDirective} from '../directives/if-authenticated.directive';
import {AuthService} from '../service/auth.service';


@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  imports: [
    RouterLinkActive,
    RouterLink,
    AsyncPipe,
    NgIf,
    IfAuthenticatedDirective,
  ],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
