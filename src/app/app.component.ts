import {Component} from '@angular/core';
import {PagerService} from './shared/pager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PagerService]
})
export class AppComponent {
}
