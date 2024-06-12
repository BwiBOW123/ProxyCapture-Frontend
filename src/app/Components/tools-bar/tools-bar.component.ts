import { Component } from '@angular/core';
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
export class ToolsBarComponent {

  path_img = ['../../../assets/img/print.png','../../../assets/img/fit_screen.png','../../../assets/img/open.png','../../../assets/img/arrow_back.png','../../../assets/img/arrow_forward.png','../../../assets/img/check.png','../../../assets/img/cancel.png']

  barcodeResults: any[] = [];

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
    if(this.dataService.getIndexData() >= this.dataService.getMaxData()){
      this.dataService.setIndexData(1);
    }else{
      this.dataService.setIndexData(this.dataService.getIndexData()+1)
    }
  }
  backDoc(){
    if(this.dataService.getIndexData() < this.dataService.getMaxData()){
      this.dataService.setIndexData(this.dataService.getMaxData());

    }else{
      this.dataService.setIndexData(this.dataService.getIndexData()-1)
    }
  }
  DWObject: WebTwain | any = null;
  containerId = "dwtcontrolContainer";

  Dynamsoft_OnReady() {
    this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
  }

  ngOnInit(): void {
    Dynamsoft.DWT.Containers = [{
      WebTwainId: 'dwtObject',
      ContainerId: this.containerId,
      Width: '0px',
      Height: '0px'
  }];
  Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
    this.Dynamsoft_OnReady();
  });
  Dynamsoft.DWT.ProductKey = 't01878AUAAEyhkBY3f/9Ygdls28qKD/lqPMytBDIKKWnB1H9o8xl1sySt+CkSeWz/vboTNtTJEMaigGfm3rG4cVM6ThDaqZT1z6kGTqvvNNR3soFTj5xAyuGw3naX1y0LNAPvDNj+HHaAJbDmcgI+YcuNHiAPMAcwLwd6wO0urocv4O5MH13o4lQDp9V3lgVSx8kGTj1yTgXSD+jGabfjWiAsX84BkAfYLcDtI7sUCM6APMAuAENiTIk/eSUsPw==';
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
}

