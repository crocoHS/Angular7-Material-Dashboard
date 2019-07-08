import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {

  form = new FormGroup ({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    file: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    number: new FormControl('',Validators.required),
    pic: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
});

  get file(){
    return this.form.value;
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  savechanges(){
    this.form.setErrors({
      invalidSavechanges: true 
    });
  }
}
