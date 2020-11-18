import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: any;
  user: User = new User();
  userForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(this.id).subscribe(result => {
      this.user = result;
      console.log(this.user);
    });
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:['', Validators.required],
      admin:[]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    } else {
      console.log(this.user)
      this.userService.updateUserById(this.user, this.id).subscribe(result => {
        console.log("User Updated Successfully.");
        this.router.navigate(["/users"]);
      }, (err) => { console.log(err) })
    }
  }

  goBack() {
    this.location.back();
  }
}
