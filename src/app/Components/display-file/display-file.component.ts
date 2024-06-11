import { Component } from '@angular/core';
import { TreeCheckboxComponent } from '../tree-checkbox/tree-checkbox.component';

@Component({
  selector: 'app-display-file',
  standalone: true,
  imports: [TreeCheckboxComponent],
  templateUrl: './display-file.component.html',
  styleUrl: './display-file.component.css'
})
export class DisplayFileComponent {

}
