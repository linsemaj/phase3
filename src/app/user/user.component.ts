import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/services/user.service'
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      console.log(this.users);
    })
  }
}
