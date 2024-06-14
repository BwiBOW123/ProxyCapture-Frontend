import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit, OnDestroy, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-checkbox.component.html',
  styleUrl: './tree-checkbox.component.css'
})
export class TreeCheckboxComponent implements AfterViewInit ,OnInit,OnDestroy{
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;
  checker:ElementRef[] = []
  areAllChecked = false;
  @Input() documentdata:any
  private documentdataSubscription:any
  page:number = -1

  plusPage():void{
    this.page += 1
  }
  constructor(private elementRef: ElementRef,private dataservice:DataService) {
    this.documentdata = this.dataservice.getDocumentData()
  }

  ngOnInit(): void {
    this.documentdataSubscription = this.dataservice.documentdata$.subscribe(newData=>{
      this.documentdata = newData
      if(this.dataservice.getDocumentData().length != 0){
        this.addNewDataDoc()
      }
    })
  }
  ngOnDestroy(): void {
    this.documentdataSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {

  }
  addNewDataDoc(){
    this.numFileScan = []
      this.dataservice.getDocumentData().forEach((value)=>{
        let filedoc:FileScan = {barcode:"",pagecunt:[],status:"Pending",checkbox:[]}
        filedoc.barcode = value.barcode
        filedoc.pagecunt = value.pages
        this.numFileScan.push(filedoc)
      })
  }
  addCheckTolist(){
    if(this.numFileScan[this.numFileScan.length-1].pagecunt != null ){
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
  }
  listCheckedCheckboxes(img:string): void {
    this.addCheckTolist()
    this.check()
    this.dataservice.setImageData(img)
  }

  check(){
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
  numFileScan:FileScan[] = [
    {barcode:"123456ER",pagecunt:["","",""],status:"Pending",checkbox:[]},
    {barcode:"12s6ER",pagecunt:["","",""],status:"Pending",checkbox:[]}
  ]
}
interface FileScan{
  barcode:string
  pagecunt:string[]
  status:string
  checkbox:ElementRef[]
  tag?:string
}
