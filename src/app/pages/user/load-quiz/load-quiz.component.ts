import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {
  catId:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService){}

  ngOnInit():void{
    
   
   this._route.params.subscribe((params)=>{
    this.catId= this._route.snapshot.params['catId'];
    console.log(params);
    

    if(this.catId==0)
   {
    console.log("load all the quiz");
    this._quiz.getActiveQuizzes().subscribe((data)=>{
       this.quizzes = data
       console.log(this.quizzes);
       
    },
    (error)=>{
      console.log(error);
      alert('error in loading all quizzes')
      
    })
   }
   else{
    this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data)=>{
      this.quizzes = data;
    },
    (error)=>{
      alert("error in loading data");
    })

    
   }
  
    
   })
   
   

  }

}
