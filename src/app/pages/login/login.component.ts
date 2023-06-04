import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData={
    username:'',
    password:''
  }

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router){}

  formSubmit(){
    console.log("login form submited");
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
        this.snack.open("Username is Required !!",'',{
          duration: 2000,
        });
        return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
        this.snack.open("Password is Required !!",'',{
          duration: 2000,
        });
        return;
    }

    //request to server to generate token
     this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);

        // login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            // redirect .. .ADMIN-dashboard
            //redirect .. .NORMAL-dashboard
            if(this.login.getUserRole()=='ADMIN')
            {
              //admin user dashboard
             // window.location.href='/admin'
             this.router.navigate(['admin'])
             this.login.loginStatusSubject.next(true);

            }else if(this.login.getUserRole()=='NORMAL'){
                
              //normal User Dashboard
             // window.location.href='/user'
             this.router.navigate(['user/0'])
             this.login.loginStatusSubject.next(true);

            }else{
              this.login.logout();
              
            }
          }
        )
      },

      (error)=>{
        console.log('error');
        console.log(error);
        this.snack.open("InValid Details !! Try again",'',{
          duration:2000
        })
      }
      
    
     );

  }

}
