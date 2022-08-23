import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.route.queryParams)
    this.route.queryParams
      .subscribe((params) => {
        console.log('Params');
        console.log(params);
           
        var emp = params;
        console.log(emp['id']);
        var emailId = emp['email'];
        var empList = [];
        var employee = {};
        if(emp['id']){
          //call emp details 
          this.http.get(environment.base_url + '/employees').subscribe((res: any) => {
            empList = res;
            if(empList.length > 0){
             var arr = empList.filter(function(emp: any){
                return emp.email == emailId;
              });
              var emp = arr[0];
            // console.log(arr);
            }else{
              console.log('No User Data found');
            }
          })
        }
        
      });
  }

}
