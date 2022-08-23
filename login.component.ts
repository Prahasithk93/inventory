import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  data: any;
  error: any;
  errorMessage: any;
  loading: boolean = false;

  constructor(private route: Router, private http: HttpClient,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  get f() {
    return this.loginForm.controls;
  }
  password() {
    this.route.navigate(['/auth/forgotpassword'])
  }
  public inputType: string = 'password';
  showpassword(event: any) {
    if (event.target.checked) {
      this.inputType = 'text';
    }
    else {
      this.inputType = 'password';
    }
  }


  login(Username: any, Password: any) {
    this.loading = false;
    console.log(Username, Password)
    // this.http.get(environment.base_url + '/employees').subscribe((res: any) => {
    //   console.log(res);
    //   this.data = res;

    //   console.log(this.data);
    // })
    // if (this.data) {

    //   console.log("error");
    // } else {
    //   this.http.get(environment.base_url + '/auth/login/?email=' + Username + '&' + 'password=' + Password).subscribe((res: any) => {
    //     this.data = res;

    //     this.route.navigate(['/admin/adminhome'])
    //     console.log(this.data);
    //   })

    // }

    //version 2
    var empData = {};
    if (this.data) {

        console.log("error");
      } else {
        this.http.get(environment.base_url + '/auth/login/?email=' + Username + '&' + 'password=' + Password).subscribe((res: any) => {
          empData = res;
        this.determineNavigation(empData);
  
          //this.route.navigate(['/admin/adminhome'])
          console.log(this.data);
        })
  
      }
      //end of version 2

    // (error: any) => {                              //Error callback
    //   console.error('error caught in component')
    //   this.loading= true;
    //   this.errorMessage = error;

    //   console.log(this.loading)

    // });
    if (this.loading = true) {

    }
    else {
      // this.route.navigate(['/admin/adminhome'])
    }
    // if (Username && Password) {
    //   // this.http.get(environment.base_url + '/auth/login/?email=Username&password=Password')
    //   this.http.get(environment.base_url + '/auth/login/?email=' + Username + '&' + 'password=' + Password).subscribe((res: any) => {
    //     this.data = res;
    //     console.log(this.data);
    //   })

    //   console.log("hello", Username, Password)
    //   this.route.navigate(['/admin/adminhome'])
    // }
    // console.log(this.data)

    // if (!this.loginForm.valid) {
    //   // this.form="required";

    //   this.loginForm.markAllAsTouched();
    // } else {

    //with emailid as input call api 
    /**
     * once response received, 
     * check if empty then throw error saying user not exists
     * if not empty check for roles
     **/
    //  var empData = '{"id":5,"email":"balaram@gmail.com","employee":{"id":5,"name":"Balaram","email":"balaram@gmail.com","phone_number":5264859645,"designation":"ROR"},"user_roles":[{"roles":"Employee"}]}';







    // var empData = '{"id":5,"email":"balaram@gmail.com","employee":{"id":5,"name":"Balaram","email":"balaram@gmail.com","phone_number":5264859645,"designation":"ROR"},"user_roles":[{"roles":"Admin"},{"roles":"Employee"}]}';
    // if (empData) {
    //   var empDataObj = JSON.parse(empData);
    //   if (empDataObj.user_roles && empDataObj.user_roles.length > 0) {
    //     var roles = empDataObj.user_roles;
    //     var isAdmin = false;
    //     for (var i = 0; i < roles.length; i++) {
    //       if (roles[i].roles) {
    //         if (roles[i].roles.toLowerCase() == 'Admin'.toLowerCase()) {
    //           isAdmin = true;
    //           break;
    //         }
    // if(roles[i].roles.toLowerCase() == 'Employee'.toLowerCase()){
    //   if(!isAdmin)
    //     this.route.navigate(['/admin/emphome']);
    // }
    //       }
    //     }
    //     if (isAdmin) {
    //       this.route.navigate(['/admin/adminhome'], { queryParams: empDataObj });
    //       //this.router.navigate(['/edit-users'], { queryParams: employee })
    //     } else { //correct the below url
    //       this.route.navigate(['/admin/emphome'], { queryParams: empDataObj });
    //     }
    //   } else {
    //     //log error on UI 'Not an valid user'
    //     console.log("No Roles Found");
    //   }
    // }
    // else {
    //   //log error on UI saying 'User not found'
    //   console.log('No user found');
    // }
    // console.log(this.loginForm.value);
    // this.services.create(this.loginForm.value);
    //call api

    // this.route.navigate(['/admin/adminhome'])
    // }
  }

  determineNavigation(empData : any){
    //empData = '{"id":5,"email":"balaram@gmail.com","employee":{"id":5,"name":"Balaram","email":"balaram@gmail.com","phone_number":5264859645,"designation":"ROR"},"user_roles":[{"roles":"Admin"},{"roles":"Employee"}]}';
    if (empData) {
      var empDataObj = empData;
      if (empDataObj.user_roles && empDataObj.user_roles.length > 0) {
        var roles = empDataObj.user_roles;
        var isAdmin = false;
        for (var i = 0; i < roles.length; i++) {
          if (roles[i].roles) {
            if (roles[i].roles.toLowerCase() == 'Admin'.toLowerCase()) {
              isAdmin = true;
              break;
            }
    // if(roles[i].roles.toLowerCase() == 'Employee'.toLowerCase()){
    //   if(!isAdmin)
    //     this.route.navigate(['/admin/emphome']);
    // }
          }
        }
        if (isAdmin) {
          this.route.navigate(['/admin/adminhome'], { queryParams: empDataObj });
          //this.router.navigate(['/edit-users'], { queryParams: employee })
        } else { //correct the below url
          this.route.navigate(['/employee/employee-detail'], { queryParams: empDataObj });
        }
      } else {
        //log error on UI 'Not an valid user'
        console.log("No Roles Found");
      }
    }
    else {
      //log error on UI saying 'User not found'
      console.log('No user found');
    }
  }
}