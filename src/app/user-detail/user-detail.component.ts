import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: any;
  user: User = new User();

  constructor(private _userService: UserService,
    private _route: ActivatedRoute, private _router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._userService.getUserById(this.id).subscribe(result => {
      this.user = result;
      console.log(this.user);
    })
  }

  deleteUserById(id: any) {
    this._userService.deleteUserById(id).subscribe((result) => {
      console.log('User Deleted Successfully..')
      this._location.back();
    })
  }

  goBack(): void {
    this._location.back();
  }

}
