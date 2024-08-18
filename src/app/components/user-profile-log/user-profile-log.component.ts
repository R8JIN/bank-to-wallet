import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormMessageComponent } from '../../form-message/form-message.component';
import { HighlightDirective } from '../../attributes/highlight.directive';

@Component({
  selector: 'app-user-profile-log',
  standalone: true,
  imports: [CommonModule, FormsModule, FormMessageComponent, HighlightDirective],
  templateUrl: './user-profile-log.component.html',
  styleUrl: './user-profile-log.component.css'
})
export class UserProfileLogComponent {

  userProfileId: any;
  editMode: boolean = false;
  data:any;
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  user_role:any;

  successMessage!:string;
  
  constructor(private router: Router){
    this.userProfileId = parseInt(this.route.snapshot.params['id'], 10);
    this.user_role= new Map([
      ["ROLE_ADMIN", "Admin"],
      ["ROLE_MODERATOR", "Moderator"],
      ["ROLE_USER", "User"]
    ]);

  }

  ngOnInit(){
    this.userService.getUserDetail(this.userProfileId).subscribe((response:any)=>{
      this.data = response.data;
      console.log("The profile detail is ", this.data);
    })
  }

  newRole: string = ''; // To hold the selected role
  availableRoles: string[] = ['admin', 'user', 'mod']; // Example available roles

  assignRole(role: string) {   
    console.log(`Assigning role: ${role}`);
    let roleList = [];
    roleList.push(role);
    
    this.userService.assignNewRole(this.userProfileId, roleList).subscribe((response:any)=>{
      console.log("The response ", response);
      this.successMessage = "New role assign";
    })
      
  }

  toggleEditMode(){

    this.editMode = true;
  }
}
