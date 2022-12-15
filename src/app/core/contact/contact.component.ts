import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { CakeService } from 'src/app/service/cake.service';
import { Message } from '../../model/message.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  user: User = new User()

  form: FormGroup = new FormGroup({
    name: new FormControl({value: this.user.firstName +' '+ this.user.lastName, disabled: false}),
    email: new FormControl({value: this.user.email, disabled:false}),
    message: new FormControl('',Validators.required)
  })

  constructor(private router: Router,private cakeService: CakeService) { }

  ngOnInit(): void {
    this.cakeService.getUser(this.user._id).subscribe({
      next: (response: User[]) => this.user = response[0] 
    })
  }

  onSubmit(form: Message) {
    let newMsg = new Message(form)
    newMsg.name = this.user.firstName +' '+ this.user.lastName
    newMsg.email = this.user.email
    this.cakeService.postMsg(newMsg).subscribe({
      next: (response: Message) => {
        this.router.navigate(['cakes'])
      },
      error: (err:any) => console.log(err)
    })
  }
}
