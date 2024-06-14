import { Component } from '@angular/core';

@Component({
  selector: 'app-display-vote',
  standalone: true,
  imports: [],
  templateUrl: './display-vote.component.html',
  styleUrl: './display-vote.component.css'
})
export class DisplayVoteComponent {
  balogic:Basicnesslogic[] = [
    {
      header:"1 (รับทราบ)",
      Logic:[true,false,false],
      errLogic:false
    },
    {
      header:"2 (ลงคะแนน)",
      Logic:[true,false,false],
      errLogic:false
    },
    {
      header:"3 (ลงคะแนน)",
      Logic:[false,true,false],
      errLogic:false
    },
    {
      header:"4 (ลงคะแนน)",
      Logic:[true,false,false],
      errLogic:false
    },
    {
      header:"5 (ลงคะแนน)",
      Logic:[false,false,true],
      errLogic:false
    },
    {
      header:"6 (ลงคะแนน)",
      Logic:[false,false,true],
      errLogic:false
    },
    {
      header:"7 (ลงคะแนน)",
      Logic:[false,false,true],
      errLogic:false
    },
    {
      header:"8 (ลงคะแนน)",
      Logic:[false,false,true],
      errLogic:false
    },
    {
      header:"9 (ลงคะแนน)",
      Logic:[false,false,true],
      errLogic:false
    },
    {
      header:"10 (ลงคะแนน)",
      Logic:[false,false,false],
      errLogic:true
    },
    {
      header:"11 (ลงคะแนน)",
      Logic:[false,false,false],
      errLogic:true
    },
    {
      header:"11 (ลงคะแนน)",
      Logic:[false,false,false],
      errLogic:true
    },
    {
      header:"12 (ลงคะแนน)",
      Logic:[false,false,false],
      errLogic:true
    },
    {
      header:"13 (ลงคะแนน)",
      Logic:[false,false,false],
      errLogic:true
    }
  ]
}

interface Basicnesslogic{
  header:string
  Logic:boolean[]
  errLogic:boolean
}
