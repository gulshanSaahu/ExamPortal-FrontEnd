import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
 
  qid: any;
  qTitle:any;
  questions= [
   {
    quesId:'',
    content:'',
    answer:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
   }
  ];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){}

  ngOnInit():void{
    
    
    this.qid= this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
  this._question.getQuestionsOfQuiz(this.qid).subscribe((data:any)=>{
    console.log(data);
    
    
    this.questions = data;
    
  },
  (error)=>{
    console.log(error);
    
  })
    
  

    
  }


  deleteQuestion(quesId:any)
  {
    
    Swal.fire({
      icon:'info',
      'title':'are you sure',
      confirmButtonText:'Delete',
      showCancelButton:true
      
      
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._question.deleteQuestion(quesId).subscribe((data)=>{
          this.questions=this.questions.filter((question)=>{
            question.quesId!=quesId
            
            Swal.fire('Success','Question Deleted','success')
          }
          
          
            )
           
        },(error)=>{
          Swal.fire('Error','Error in deleting quiz','error')
          console.log(error);
          
        }
          )
      }
    })
    
  }


}
