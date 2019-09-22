import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public title = 'Identifiez-vous';

  public userForm: FormGroup = new FormGroup({});

  /**
   *
   * @param formBuilder As Dependency Injection
   */

  constructor() { }

  /**
 * Controls getter
 */

 public get login(): AbstractControl {
  return this.userForm.controls.login;
}

public get password(): AbstractControl {
 return this.userForm.controls.password;
}

  ngOnInit() {
  }

}
