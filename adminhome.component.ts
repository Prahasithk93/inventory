import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  employee:any= {
    name: "",
    email: "",
    phone_number: "",
    designation: "",
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.queryParams)
    this.route.queryParams
      .subscribe((params) => {
        console.log('Params');
        console.log(params);
           
        var emp = params;
        console.log(emp['id']);
        this.employee={ ...params }
        console.log(this.employee)
      });
  }

}
