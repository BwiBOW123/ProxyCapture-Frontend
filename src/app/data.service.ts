import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DataService {
  private Page = new BehaviorSubject<number>(0);
  private Folder = new BehaviorSubject<number>(0);
  private fit_w_class = new BehaviorSubject<string>("");
  private img_soruce = new BehaviorSubject<string>("");
  private documentdata = new BehaviorSubject<Documentdata[]>([]);
  Page$ = this.Page.asObservable();
  Folder$ = this.Folder.asObservable();
  fitclass$ = this.fit_w_class.asObservable();
  documentdata$ = this.documentdata.asObservable();
  imgsoruce$ = this.img_soruce.asObservable();

  // getter
  public getPageData(): number {
    return this.Page.getValue();
  }

  public getFolderData(): number {
    return this.Folder.getValue();
  }

  public getfitClass(): string {
    return this.fit_w_class.getValue();
  }
  public getDocumentData(): Documentdata[] {
    return this.documentdata.getValue();
  }
  public getImageData(): string {
    return this.img_soruce.getValue();
  }
  // setter
  public setPageData(newData: number): void {
    this.Page.next(newData);
  }

  public setFolderData(newData: number): void {
    this.Folder.next(newData);
  }

  public setfitclass(newData: string): void {
    this.fit_w_class.next(newData);
  }
  public setDocumentData(newData: Documentdata[]): void {
    this.documentdata.next(newData);
  }
  public setImageData(newData: string): void {
    this.img_soruce.next(newData);
  }
  public setImageDataFP(Fodler: number,page: number): void {
    let doc = this.getDocumentData()
    this.img_soruce.next(doc[Fodler].pages[page]);
  }
}
interface Documentdata{
  barcode:string
  pages:string[]
  tag?:string
}

