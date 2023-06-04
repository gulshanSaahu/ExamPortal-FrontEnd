import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent {
  public Editor = ClassicEditor;
  qId:any;
  qTitle:any;
  question={
    quiz:{
       qid :''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(private  _route:ActivatedRoute,private _question:QuestionService){}

  ngOnInit():void{
    this.qId = this._route.snapshot.params['qid'];
    console.log(this.qId);

    this.qTitle = this._route.snapshot.params['title']

    this.question.quiz['qid'] = this.qId;
    
  }

  formSubmit(){
     
    if(this.question.content.trim() == '' || this.question.content ==null){
      return;

    }

    if(this.question.option1.trim() == '' || this.question.option1 ==null){
      return;

    }
    if(this.question.option2.trim() == '' || this.question.option2 ==null){
      return;

    }
    if(this.question.answer.trim() == '' || this.question.answer ==null){
      return;

    }

   this._question.addQuestion(this.question).subscribe((data)=>{

    this.question.content='';
    this.question.option1="";
    this.question.option2="";
    this.question.option3="";
    this.question.option4="";
    this.question.answer="";


    Swal.fire('Success','Question Added','success');
    
    console.log(data);
    

   },
   (error)=>{
    console.log(error);
    Swal.fire('Error','Error in Adding Question ','error');
    
   }
   )
  }


}
