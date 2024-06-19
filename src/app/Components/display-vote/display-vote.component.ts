import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-display-vote',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './display-vote.component.html',
  styleUrl: './display-vote.component.css'
})
export class DisplayVoteComponent implements OnInit {

  questions = [
    {
      name:"วาระที่ 1",
      ans1:"เห็นด้วย",
      ans2:"ไม่เห็นด้วย",
      ans3:"งดออกเสียง",
      select:"เห็นด้วย"
    },
    {
      name:"วาระที่ 2",
      ans1:"เห็นด้วย",
      ans2:"ไม่เห็นด้วย",
      ans3:"งดออกเสียง",
      select:"ไม่เห็นด้วย"
    },
    {
      name:"วาระที่ 3",
      ans1:"เห็นด้วย",
      ans2:"ไม่เห็นด้วย",
      ans3:"งดออกเสียง",
      select:"งดออกเสียง"
    },
    {
      name:"วาระที่ 4",
      ans1:"เห็นด้วย",
      ans2:"ไม่เห็นด้วย",
      ans3:"งดออกเสียง",
      select:"เห็นด้วย"
    },
    {
      name:"วาระที่ 5",
      ans1:"เห็นด้วย",
      ans2:"ไม่เห็นด้วย",
      ans3:"งดออกเสียง",
      select:"เห็นด้วย"
    }
  ]
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({});
    this.form.addControl("Name",fb.control("ชื่อไทย 123456"))
    this.form.addControl("offerProxy",fb.control("นายศร"))
    this.form.addControl("signature",fb.control(""))
    this.questions.forEach((question)=>{
      this.form.addControl(
        question.name,
        fb.control(question.select)
      );
    })
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.form.value)
  }
}
