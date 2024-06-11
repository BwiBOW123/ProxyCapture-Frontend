import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent  {
  @Input() text:string = "Hello";
  @Input() Class_Style:string = "button1 text-white";
  @Input() ClassActive:string = "non-active"
  @Input() Src:string = ""
  @Output() onClick = new EventEmitter<void>();
  btn_Isactive:string = ""
  All_CLASS:string = this.Class_Style + " " +this.btn_Isactive;

  handleClick() {
    this.onClick.emit();
  }

}
