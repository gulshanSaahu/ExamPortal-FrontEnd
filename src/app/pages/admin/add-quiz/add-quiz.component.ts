import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  constructor(private category:CategoryService, private snack:MatSnackBar,private quiz:QuizService){

  }

  categories=[
    {
    cid:'',
    title:""
    },
    
  ]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'true',
    category:{
      cid:'',
    }
  }

  ngOnInit():void{
    this.category.categories().subscribe(
      (data:any)=>{
          this.categories= data;
          console.log(this.categories);
      },
      (error)=>{
        Swal.fire('Error!!',"error in loadfing from server","error");
      }

    )
  }

  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
        this.snack.open("Title Required !!",'',{
          duration:2000,
        });
        return
    }

    if(this.quizData.description.trim()=='' || this.quizData.description==null){
      this.snack.open("Description Required !!",'',{
        duration:2000,
      });
      return
  }

  


this.quiz.addQuiz(this.quizData).subscribe(
  (data:any)=>{
    Swal.fire('Success','quiz is added','success')
    this.quizData={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:'true',
      category:{
        cid:'',
      }
    }
  

  },
  (error)=>{
    Swal.fire("Error",'Error while adding quiz','error');
    console.log(error);
  }
  
)
   }

}
