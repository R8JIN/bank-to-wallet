import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormMessageComponent } from '../../form-message/form-message.component';
import { HighlightDirective } from '../../attributes/highlight.directive';
import { sample } from 'rxjs';

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
  roleList:any = [];
  availableRoles: string[] =[];
  removeRoleList: string[] = [];

  successMessage!:string;
  errorMessage!: string;
  
  constructor(private router: Router){
    this.userProfileId = parseInt(this.route.snapshot.params['id'], 10);
    this.user_role= new Map([
      ["ROLE_ADMIN", "admin"],
      ["ROLE_MODERATOR", "mod"],
      ["ROLE_USER", "user"]
    ]);
    this.availableRoles = ['admin', 'user', 'mod']; 

  }

  ngOnInit(){
    this.userService.getUserDetail(this.userProfileId).subscribe((response:any)=>{
      this.data = response?.data;
      let sampleRole:any = [];
      this.data.roles.forEach((element:any) => {
        sampleRole.push(this.user_role.get(element.name));
      });

      console.log("The sample role are ", sampleRole);
      this.availableRoles = this.availableRoles.filter(role => !sampleRole.includes(role));
      
    })
  }

  newRole: string = ''; 


  addRole(role: string) {   
    if(role){
      this.newRole = '';
      console.log(`Assigning role: ${role}`);
      this.roleList.push(role);
      this.availableRoles.splice(this.availableRoles.indexOf(role), 1);
      console.log("The available Roles", this.availableRoles);
    }   
  }

  removeRole(role:string){

    this.roleList.splice(this.availableRoles.indexOf(role), 1);
    this.availableRoles.push(role);
  }

  assignRole(){
    this.userService.assignNewRole(this.userProfileId, this.roleList).subscribe((response:any)=>{
      console.log("The response ", response);
      window.location.reload();
      // this.successMessage = "New role assigned.";
      // setTimeout(()=>this.successMessage='',3000);
    })
  }

  removeOldRole(role:string){
    this.removeRoleList.push(role);
    console.log("The role is ", this.removeRoleList);
    this.userService.removeOldRole(this.userProfileId, this.removeRoleList).subscribe((response:any) => {
      console.log("The response ", response);
      window.location.reload();
      // this.errorMessage = "Role removed.";
      // setTimeout(()=>this.errorMessage='',3000);
    }
    );

  }

  toggleEditMode(){

    this.editMode = true;
  }
}
