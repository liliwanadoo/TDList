import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { BirthDateValidatorService } from 'src/app/shared/services/birth-date-validator.service';
import { UserCollection } from 'src/app/models/user-collection';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, Router } from '@angular/router';
import { stringify } from 'querystring';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  /**
   * Input attribute from the parent directive [user]
   */
  @Input() userForm: FormGroup;
  @Input() oUser: User;

  @Output() updateUserEvent: EventEmitter<User> = new EventEmitter<User>();
  /**public oldUserForm: FormGroup = this.userForm;*/

  constructor(
              private collection: UserCollection,
              private router: Router,
              private toastr: ToastrService) {
  }

/**
 * Controls getter
 */

 public get libelle(): AbstractControl {
  return this.userForm.controls.libelle;
}

public get categorie(): AbstractControl {
 return this.userForm.controls.categorie;
}

public get birthDate(): AbstractControl {
 return this.userForm.controls.birthDate;
}

public get duree(): AbstractControl {
 return this.userForm.controls.duree;
}

ngOnInit() {
  }

  public update() {
    console.log('Yo.....Datas are : ' + JSON.stringify(this.userForm.value));
      // First, instanciate a brand new User and feed with form values
    const brandNewUser: User = new User().transform(this.userForm.value);
   // brandNewUser.libelle = this.libelle.value;
   // brandNewUser.categorie = this.categorie.value;
   // brandNewUser.birthDate = this.birthDate.value;
   // brandNewUser.duree = this.duree.value;

   // Second... (special thx for Felice) persist this user into persistent object


    this.toastr.success('La tâche ' + brandNewUser.libelle + ' a été mise à jour', 'Info');

   // this.router.navigate(['']);
    this.updateUserEvent.emit(brandNewUser);
    // Cherry on cake : put a toast to inform the end user...
    // }
  }

  public dismiss(): void {
    this.updateUserEvent.emit(null);
  }
}
