import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  UserForm: FormGroup;
  submitted = false;
  user: User = new User();
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
     ) { }

  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required],
      admin:[]
    });
   
  }



  get f() {
    return this.UserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    } else {
      console.log(this.user)
      this.userService.addUser(this.user).subscribe(result => {
        console.log("User Added Successfully.");
        this.router.navigate(["/users"]);
      }, (err) => { console.log(err) })
    }
  }
}
