import {  Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit  } from '@angular/core';

@Component({
  selector: 'app-tree-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './tree-checkbox.component.html',
  styleUrl: './tree-checkbox.component.css'
})
export class TreeCheckboxComponent implements AfterViewInit {
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;
  checker:ElementRef[] = []
  areAllChecked = false;
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.addCheckTolist()
  }
  addCheckTolist(){
    this.checker = this.checkboxes.toArray()
    let currentBox = 0
    for (let item of this.numFileScan) {
      let itemIndex = this.numFileScan.indexOf(item);
      for (let index = 0; index < item.pagecunt.length; index++) {
        this.numFileScan[itemIndex].checkbox.push(this.checker[currentBox])
        currentBox++
      }
    }
    this.checker = []
  }
  listCheckedCheckboxes(): void {
    let headbox:HTMLInputElement[] = []
    for (let item of this.numFileScan) {
      let itemIndex = this.numFileScan.indexOf(item);
      const element = document.getElementById(this.numFileScan[itemIndex].barcode) as HTMLInputElement
      headbox.push(element)
      if(this.numFileScan[itemIndex].checkbox.length == this.numFileScan[itemIndex].checkbox.filter((value)=>value.nativeElement.checked == true).length){
        this.numFileScan[itemIndex].status = "Completed"
        element.checked = true
        }else{
        this.numFileScan[itemIndex].status = "Pending"
        element.checked = false
      }
    }
    const headcheck = document.getElementById('headerbox') as HTMLInputElement
    if(headbox.length == headbox.filter((value)=>value.checked == true).length){
      headcheck.checked = true
    }else{
      headcheck.checked = false
    }
    headbox = []
  }

  checked(){
    this.numFileScan[0].status = "Pending"
  }
    numFileScan:FileScan[] = [
      {
        barcode:"406402T",
        pagecunt:[1,2,3,4,5],
        status:"Pending",
        checkbox:[]
      }
    ]
}
interface FileScan{
  barcode:string
  pagecunt:number[]
  status:string
  checkbox:ElementRef[]

}
