import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messsage-box',
  standalone: true,
  imports: [],
  templateUrl: './messsage-box.component.html',
  styleUrl: './messsage-box.component.css'
})
export class MesssageBoxComponent {
  isOpen = true;
  @Input() isProcessBox:boolean = false
  @Input() textHead:string = "Function Replace"
  @Input() textContent:string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, iste!"

  @Output() closed = new EventEmitter<void>();

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

}
