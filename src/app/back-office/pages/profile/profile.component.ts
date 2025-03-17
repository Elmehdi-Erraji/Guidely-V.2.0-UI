import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../core/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usersService.getUserById(userId).subscribe(
        data => {
          this.profileData = data;
          console.log('Profile data in component:', this.profileData);
        },
        error => {
          console.error('Error fetching user data', error);
        }
      );
    } else {
      console.error('No user id found in localStorage');
    }
  }
}
