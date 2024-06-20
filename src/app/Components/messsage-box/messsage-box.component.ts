import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messsage-box',
  standalone: true,
  imports: [],
  templateUrl: './messsage-box.component.html',
  styleUrl: './messsage-box.component.css'
})
export class MesssageBoxComponent {
  @Input() isProcessBox:boolean = false
  @Input() textHead:string = "Function Replace"
  @Input() textContent:string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, iste!"
}
