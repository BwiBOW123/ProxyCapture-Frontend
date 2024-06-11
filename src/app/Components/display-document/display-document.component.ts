import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-display-document',
  standalone: true,
  imports: [],
  templateUrl: './display-document.component.html',
  styleUrl: './display-document.component.css'
})
export class DisplayDocumentComponent implements OnInit, OnDestroy{


  @Input() index: number;
  @Input() max: number;

  @Input() fitWindow:string;

  @Input() imgArr:string[] = ['../../../assets/img/001.jpg','../../../assets/img/002.png','../../../assets/img/003.jpg','../../../assets/img/001.jpg','../../../assets/img/004.jpg']
  private indexSubscription: any;
  private maxSubscription: any;
  private fitWindowSubscription: any;


  constructor(private dataService: DataService) {
    this.index = dataService.getIndexData()
    this.max = dataService.getMaxData()
    this.fitWindow = dataService.getfitClass()
  }

  ngOnInit() {
    this.indexSubscription = this.dataService.index$.subscribe(newIndex => {
      this.index = newIndex;
    });

    this.maxSubscription = this.dataService.max$.subscribe(newMax => {
      this.max = newMax;
    });

    this.fitWindowSubscription = this.dataService.fitclass$.subscribe(fitclass =>{
      this.fitWindow = fitclass
    })
  }
  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
    this.maxSubscription.unsubscribe();
    this.fitWindowSubscription.unsubscribe();
  }
}
