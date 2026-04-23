import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormMainComponent } from './components/form-main/form-main.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatButtonModule, FormMainComponent, ResultDisplayComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-acceleration';
}
