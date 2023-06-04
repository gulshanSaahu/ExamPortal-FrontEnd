import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],

})
export class UpdateQuizComponent  implements OnInit{
  constructor(private route:ActivatedRoute,
    private _quiz:QuizService,
    private cat:CategoryService,
    private router:Router){}
  qid=0;
  quiz:any;

  categories:any;
    

  ngOnInit():void{
   this.qid= this.route.snapshot.params['qid'];
   //alert(this.qid)
   this._quiz.getQuiz(this.qid).subscribe(
    (data)=>{
      this.quiz = data;
      console.log(this.quiz);
    },
    (error)=>{
      console.log(error);
    }
   );

   this.cat.categories().subscribe(
    (data)=>{
      this.categories=data;
    },
   
   (error)=>
   {
alert('error in loading cATEGORY');
   }
   );




  }

  // update form submit

  public updateData(){
   this._quiz.updateQuiz(this.quiz).subscribe(
    (data)=>{
Swal.fire('Success !!',"Quiz Updated","success").then((e)=>{
  this.router.navigate(['/admin/quizzes'])
});
    },
    (error)=>{
      Swal.fire("error",'error in updating quiz','error');
      console.log(error);

    }
   )
  }

}
