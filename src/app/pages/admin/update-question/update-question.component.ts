import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit
{
  quesId:any;
  question:any;
  qTitle:any;
  constructor(
    private _question:QuestionService,
    private _route:ActivatedRoute,
    private _router:Router
  ){}

  ngOnInit():void{
   this.quesId = this._route.snapshot.params['quesId'];
   this._question.getQuestion(this.quesId).subscribe((data)=>{
    console.log(data);
    this.question = data;
    this.qTitle = this._route.snapshot.params['title'];
    
   },
   (error)=>{
    console.log(error);
    
   })

  }
  updateQuestion(){
    this._question.updateQuestion(this.question).subscribe((data)=>{
      Swal.fire('Success','Updated Question','success');
      this._router.navigate(['admin/quizzes']);
    },
    (error)=>{
      Swal.fire('Error','Error in Updating Question','error');
    })
  }

  

}
