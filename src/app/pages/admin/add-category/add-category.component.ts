import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(private categori:CategoryService,private snack:MatSnackBar){}

  category={
    title:'',
    description:''
  }

  formSubmit(){

    if(this.category.title.trim()=='' || this.category.title==null)
    {
        this.snack.open("Title Required !!",'',{duration:2000});
      return ;
    }

    if(this.category.description.trim()=='' || this.category.description==null)
    {
        this.snack.open("Discription Required !!",'',{duration:2000});
      return ;
    }

    this.categori.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!",' Category is Added Scccessfully','success')
      },
      (error)=>{
        Swal.fire("Error !!",'Server Errror !!','success');
      }
      
    )

  }

}
