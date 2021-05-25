import { Component, ViewEncapsulation } from '@angular/core';
import { ClientRoutes } from '@models/routes';
import { clientRoutes } from '@helpers/variables/routes';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LogoComponent {
  routes: ClientRoutes = clientRoutes;
}
