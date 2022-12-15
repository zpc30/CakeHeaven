import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { CakeService } from 'src/app/service/cake.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User()
  lock: boolean = true;

  form: FormGroup = new FormGroup({
    _id: new FormControl({value: this.user._id,disabled: false}),
    firstName: new FormControl({value: this.user.firstName, disabled: true},Validators.required),
    lastName: new FormControl({value: this.user.lastName, disabled: true},Validators.required),
    email: new FormControl({value: this.user.email, disabled: true},Validators.email),
  })

  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.cakeService.getUser(1).subscribe({
      next: (response: User[]) => this.user = response[response.length-1]
    })
  }

  onSubmit(form: User) {
    let newUser = new User(form)
    this.cakeService.changeUser(newUser).subscribe({
      next: (response: any) => console.log('user changed'),
      error: (err: any) => console.log(err)
    })
    this.lock = true;
    this.form.controls['firstName'].disable()
    this.form.controls['lastName'].disable()
    this.form.controls['email'].disable()
  }

  toggleLock() {
    if(this.lock== true) {
      this.lock= false  
      this.form.controls['firstName'].enable()
      this.form.controls['lastName'].enable()
      this.form.controls['email'].enable()
    } else {
      this.lock= true     
      this.form.controls['firstName'].disable()
      this.form.controls['lastName'].disable()
      this.form.controls['email'].disable()
      
    }
  }
}
