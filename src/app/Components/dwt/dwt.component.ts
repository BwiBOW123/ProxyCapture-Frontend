
import { Component } from '@angular/core';
import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';


@Component({
  selector: 'app-dwt',
  standalone: true,
  imports: [],
  templateUrl: './dwt.component.html',
  styleUrls: ['./dwt.component.css']
})
export class DwtComponent {


  DWObject: WebTwain | any = null;
  containerId = "dwtcontrolContainer";

  Dynamsoft_OnReady() {
    this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
  }

  ngOnInit(): void {
    Dynamsoft.DWT.Containers = [{
        WebTwainId: 'dwtObject',
        ContainerId: this.containerId,
        Width: '800px',
        Height: '600px'
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
        .then(()=> this.processAcquiredImages() )
        .catch(() => {

        });
    }
  }
  processAcquiredImages() {
    console.log("process work")
    let imageBuf:Array<number> = []
    const DWObject = this.DWObject;
    for(let i = 0;i < DWObject.HowManyImagesInBuffer;i++){
      imageBuf.push(i)
    }
    console.log(imageBuf)
    DWObject.ConvertToBase64([0],Dynamsoft.DWT.EnumDWT_ImageType.IT_PDF,(result:any, indices:any, type:any)=>{
      console.log(result.getData(0, result.getLength()));
    },(errorCode:any, errorString:any)=>{
      console.log(errorString);
    })
  }

}
