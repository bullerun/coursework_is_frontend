import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import {AuthService} from '../service/auth.service';

@Directive({
  selector: '[ifAuthenticated]',
  standalone: true
})
export class IfAuthenticatedDirective {
  private hasView = false;

  @Input() set ifAuthenticated(condition: boolean) {
    const isAuthenticated = this.authService.isAuthenticated();

    if (condition === isAuthenticated && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
}
