import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService:UserService,private snack:MatSnackBar){}

  public user={
     username: '',
     password: '',
     firstName: '',
     lastName: '',
     email: '',
     phone: '',

  };

  formSubmit()
  {
    console.log(this.user);
    if(this.user.username=='' || this.user.username == null)
    {
      //alert("user is required !!");
      this.snack.open("UserName is required !!",'',{
        duration:3000,
       
      });

      return;
    }

    //addUser:userService
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
         //seccess
         console.log(data);
         //alert('success');
         Swal.fire('Success','user id is'+data.id,'success');
      },
      (error)=>{
           //
           console.log(error);
         //alert('Something went wrong');
         this.snack.open("Something went wrong !!",'',{
          duration:3000,
         
        });
      }
      
    )
  }

}
