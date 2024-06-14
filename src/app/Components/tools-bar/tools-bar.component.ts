import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';
import { DynamsoftService } from '../../dynamsoft.service';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

@Component({
  selector: 'app-tools-bar',
  standalone: true,
  imports: [ButtonComponent,RouterLink],
  templateUrl: './tools-bar.component.html',
  styleUrl: './tools-bar.component.css'
})
export class ToolsBarComponent implements OnInit {

  path_img = ['../../../assets/img/print.png','../../../assets/img/fit_screen.png','../../../assets/img/open.png','../../../assets/img/arrow_back.png','../../../assets/img/arrow_forward.png','../../../assets/img/check.png','../../../assets/img/cancel.png']

  barcodeResults: any[] = [];
  Folder:number = 0
  Page:number = 0
  MaxPage:number = 5
  constructor(private dataService: DataService,private dynamsoftService: DynamsoftService) {
  }

  getDataservice(){
    console.log(this.dataService.getIndexData())
  }

  fitWindow(){
    this.dataService.setfitclass("fitWindow")
  }
  fitScreen(){
    this.dataService.setfitclass("fitSc")
  }
  nextDoc(){
    if(this.dataService.getDocumentData().length != 0 ){
      this.MaxPage = this.dataService.getDocumentData()[this.Folder].pages.length -1
      if(this.Page >= this.MaxPage && this.Folder < this.dataService.getDocumentData().length-1){
        this.Folder++
        this.Page = 0
      }else if(this.Page < this.MaxPage){
        this.Page++
      }
      console.log("Folder: "+this.Folder," Page: "+this.Page)
    }
  }
  backDoc(){
    if(this.dataService.getDocumentData().length != 0 ){
      if(this.Page < 0 && this.Folder > 0){
        this.Folder--
        this.Page = this.dataService.getDocumentData()[this.Folder].pages.length -1
      }else if(this.Page >= 0){
        this.Page--
      }
      console.log("Folder: "+this.Folder," Page: "+this.Page)
    }
  }
  DWObject: WebTwain | any = null;
  containerId = "dwtcontrolContainer";

  Dynamsoft_OnReady() {
    this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
  }

  ngOnInit(): void {
    console.log("Folder: "+this.Folder," Page: "+this.Page)
    Dynamsoft.DWT.Containers = [{
      WebTwainId: 'dwtObject',
      ContainerId: this.containerId,
      Width: '0px',
      Height: '0px'
  }];
  Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
    this.Dynamsoft_OnReady();
  });
  Dynamsoft.DWT.ProductKey = 't01898AUAADqpfiwCdum8DS4zwO0GaXGvhvvyqqHGpvCxGE+yMnPwjVU2Etw/X4PCKH60MIG3sKcz2xGDrAqUfsFCSQeahU3t9c+pAk7L7zTkd7KAU4+cQDsP47Lb1TxvmqAReM+AbcdhA5gCSy0HoAtrbfQAeYA5gHk10AMuV3H++cIxIOnXOxs6OVXAafmdaUDyOFnAqUfOISB1RNUPq+2XgDA9OTtAHmCXANeL7BQQHAF5gJ0ARllAaz+J4DGR';
  Dynamsoft.DWT.ResourcesPath = 'assets/dwt-resources';
  Dynamsoft.DWT.Load();
  }

  acquireImage() {
    if (this.DWObject) {
        this.DWObject.SelectSourceAsync()
        .then(() => {
            return this.DWObject.AcquireImageAsync({
              IfCloseSourceAfterAcquire: true,
              IfShowUI: false,
              PixelType: Dynamsoft.DWT.EnumDWT_PixelType.TWPT_GRAY,
              Resolution: 150,
            });
        })
        .then(()=> {
          this.processAcquiredImages()
        } )
        .catch(() => {

        });
    }
  }
  barcode:string = ''
  docs:Documentdata[] = []
  async processAcquiredImages():Promise<void> {
    this.dataService.setIndexData(1)
    this.dataService.setMaxData(this.DWObject.HowManyImagesInBuffer)
    for (let index = 0; index < this.DWObject.HowManyImagesInBuffer; index++) {
      let base64 = await this.decodeBase64([index])
      let code = await this.decodeBarcode(base64)
      await this.saveDataDocument(code,base64)
    }
    this.dataService.setDocumentData(this.docs);
    console.log(this.docs)
    this.dataService.setImageData(this.docs[0].pages[0])
    if (this.DWObject) {
      this.DWObject.RemoveAllImages();
    }
  }

cuntFolder:number = -1

async saveDataDocument(code:string,base64:string):Promise<void>{
  let doc:Documentdata = {barcode:"",pages:[]}
  if(code != this.barcode){
      this.cuntFolder++
      this.docs.push(doc)
      this.docs[this.cuntFolder].barcode = code
      this.docs[this.cuntFolder].tag = (this.cuntFolder-1).toString()
      this.docs[this.cuntFolder].pages.push(base64)
      this.barcode = code
    }else{
      this.docs[this.cuntFolder].pages.push(base64)
  }
}

  async decodeBase64(index :[number]):Promise<string>{
    return new Promise((resole,reject)=>{
      try {
        this.DWObject.ConvertToBase64(index,Dynamsoft.DWT.EnumDWT_ImageType.IT_JPG,(result:any, indices:any, type:any)=>{
          let base64
          base64 = result.getData(0, result.getLength())
          resole(base64)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  async decodeBarcode(base64:string):Promise<any>{
    return new Promise(async (resole,reject)=>{
      try {
        let barcodeResults:any = await this.dynamsoftService.decodeFromBase64(base64)
        let barcode = (barcodeResults[0] == true)?barcodeResults[1][0].barcodeText:this.barcode
        resole(barcode)
      } catch (error) {
        reject(error)
      }
    })
  }
}

interface Documentdata{
  barcode:string
  pages:string[]
  tag?:string
}

