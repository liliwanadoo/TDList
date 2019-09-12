import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { BirthDateValidatorService } from 'src/app/shared/services/birth-date-validator.service';
import { UserCollection } from 'src/app/models/user-collection';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Compteur } from 'src/app/models/compteur';
import { Cpt } from 'src/app/models/cpt';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  /**
   * Manage the error placeholder
   * Keep
   * It
   * Simple and
   * Stupid
   */

  private hasErrors: boolean = false;

  /**
   * Form manager handled by ReactiveForms
   */

   public userForm: FormGroup;

   /**
    *
    * @param formBuilder As Dependency Injection
    */
  constructor(private formBuilder: FormBuilder,
              private birthDateValidator: BirthDateValidatorService,
              private collection: UserCollection,
              private toastr: ToastrService,
              private mesCompteurs: Compteur
              ) { }
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
    this.userForm = this.formBuilder.group({
      libelle: [
        '',
        [Validators.required,
          Validators.minLength(3)]
      ],
      categorie: [
        '',
        [Validators.required,
          Validators.minLength(3)]
      ],
      birthDate: [
        '',
      ],
      duree: [
        '',
        Validators.pattern('^(0|[0-9]*)$')
      ]
    });
  }
  public submit() {
    if (this.userForm.valid) {
      console.log('Yo.....Datas are : ' + JSON.stringify(this.userForm.value));

      // First, instanciate a brand new User and feed with form values
      const brandNewUser: User = new User();
      brandNewUser.libelle = this.libelle.value;
      brandNewUser.categorie = this.categorie.value;
      brandNewUser.birthDate = this.birthDate.value;
      brandNewUser.duree = this.duree.value;

    // Second... (special thx for Felice) persist this user into persistent object
      this.collection.add(brandNewUser);

      const nouveauxCompteurs: Cpt = new Cpt();
      this.toastr.success('La tâche ' + brandNewUser.libelle + ' est créée', 'Info');

      this.libelle.reset();
      this.categorie.reset();
      this.birthDate.reset();
      this.duree.reset();

    // Third go back to home...
    // this.router.navigate(['']);
    // Cherry on cake : put a toast to inform the end user...
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        console.log(key + ' [ ' + JSON.stringify(this.userForm.controls[key].errors) + '] : ' + this.userForm.controls[key].status);
      });

    }
  }
}
