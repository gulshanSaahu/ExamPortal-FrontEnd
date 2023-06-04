import { Component } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
qid:any;
questions:any;

marksGot = 0;
correctAnswers = 0;
attempted=0;
timer:any;
isSubmit = false;
  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,
    private _question:QuestionService
    ){}

  ngOnInit():void{
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
   
    this.loadQuestions();
    
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data)=>{
      
      this.questions = data;
      this.timer = this.questions.length * 2 *60;
      
     // this.questions.forEach((q:any)=>{
     //   q['givenAnswer']='';
    //  });
      this.startTimer();
      
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error",'Error in loading questions of quiz','error')
      
    })
  }

    preventBackButton(){
      history.pushState(null, '',location.href);
      this.locationSt.onPopState(()=>{
        history.pushState(null,'',location.href)
      })
      
    }

    submitQuiz(){
      Swal.fire({
        title: 'Do you want to submit the quiz',
        
        showCancelButton: true,
        confirmButtonText: 'Submit',
        denyButtonText: `Don't Save`,
        icon:'info'
      }).then((e)=>{
        if(e.isConfirmed)
        {
          
            this.evalQuiz();
          
        }
      })
    }

    startTimer(){
     let t =  window.setInterval(()=>{
        if(this.timer<=0)
        {
          this.evalQuiz();
          clearInterval(t);
        }else{
          this.timer--;
        }
      },1000)
    }
  
    getFormattedTime(){
      let mm = Math.floor(this.timer/60);
      let ss = this.timer-mm*60;
      return `${mm} min : ${ss} sec`;
    }

    evalQuiz(){

      // cal to server to check question
      this.isSubmit = true;
      this._question.evalQuiz(this.questions).subscribe((data:any)=>{
       this.marksGot = data.marksGot;
       this.correctAnswers = data.correctAnswers;
       this.attempted = data.attempted;
        

        
      },
      (error)=>{
        console.log(error);
        
      })

      this.isSubmit = true;
        
     
    
    //  this.questions.forEach((q:any)=>{
    //    if(q.givenAnswer==q.answer)
    //    {
    //      this.correctAnswers++;
    //     let marksSingle =  this.questions[0].quiz.maxMarks/this.questions.length
    //     this.marksGot += marksSingle;
    //    }
    //    if(q.givenAnswer.trim()!='')
    //    {
    //      this.attempted++;
    //    }

    //  });
        
    // console.log("CorrectAnswer"+this.correctAnswers);
     //  console.log(this.marksGot);
     // console.log(this.attempted);
        
        

    }

    printPage(){
      window.print();
    }

}



