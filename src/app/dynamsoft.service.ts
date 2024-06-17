import { Injectable } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

@Injectable({
  providedIn: 'root'
})
export class DynamsoftService {

  private reader: any;

  constructor() {
    this.initDynamsoft();
  }

  private initDynamsoft() {
    BarcodeScanner.engineResourcePath = 'https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/';
    BarcodeScanner.productKeys = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAyOTE3ODQyLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAyOTE3ODQyIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjoyMTE2OTc3NjEyfQ==';
  }

  async createBarcodeReader() {
    if (!this.reader) {
      try {
        this.reader = await BarcodeScanner.createInstance();
      } catch (ex) {
        console.error(ex);
      }
    }
    return this.reader;
  }

  async decodeFromImage(file: File) {
    try {
      if (!this.reader) {
        await this.createBarcodeReader();
      }
      const results = await this.reader.decode(file);
      return results;
    } catch (ex) {
      console.error(ex);
      return [];
    }
  }

  async decodeFromBase64(base64String: string) {
    try {
      if (!this.reader) {
        await this.createBarcodeReader();
      }
      const results = await this.reader.decodeBase64String(`data:image/jpg;base64,${base64String}`);
      if(results[0] != undefined){
        return [true,results];
      }else{
        return [false,results];
      }
    } catch (ex) {
      return [];
    }
  }
}
