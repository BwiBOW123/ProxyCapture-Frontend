import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DataService {
  private indexSubject = new BehaviorSubject<number>(0);
  private maxSubject = new BehaviorSubject<number>(0);
  private fit_w_class = new BehaviorSubject<string>("");
  private img_soruce = new BehaviorSubject<string>("");
  private documentdata = new BehaviorSubject<Documentdata[]>([]);
  index$ = this.indexSubject.asObservable();
  max$ = this.maxSubject.asObservable();
  fitclass$ = this.fit_w_class.asObservable();
  documentdata$ = this.documentdata.asObservable();
  imgsoruce$ = this.img_soruce.asObservable();



  // getter
  public getIndexData(): number {
    return this.indexSubject.getValue();
  }

  public getMaxData(): number {
    return this.maxSubject.getValue();
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
  public setIndexData(newData: number): void {
    this.indexSubject.next(newData);
  }

  public setMaxData(newData: number): void {
    this.maxSubject.next(newData);
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
}
interface Documentdata{
  barcode:string
  pages:string[]
  tag?:string
}

