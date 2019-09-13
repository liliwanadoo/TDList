import { Component, OnInit } from '@angular/core';
import { UserCollection } from 'src/app/models/user-collection';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { Compteur } from 'src/app/models/compteur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public dateDuJour: any;
  userForm: any;
  public nbValid: number;
  public nbSuppr: number;
  public nbEnCours: number;
  public buttonDisabled: boolean = false;

  public constructor(
    private collection: UserCollection, private toastr: ToastrService, private http: HttpClient,
    private formBuilder: FormBuilder,
    private mesCompteurs: Compteur,
    private router: Router
  ) {
    this.http.get(
      'http://worldclockapi.com/api/json/utc/now'
    ).subscribe((response: any) => {this.dateDuJour = response.currentDateTime; });
    this.nbValid = this.mesCompteurs.getNbValid();
    this.nbSuppr = this.mesCompteurs.getNbSuppr();
    this.nbEnCours = this.mesCompteurs.getNbEnCours();

    console.log('Nb Valid ' + this.nbValid + ' Nb En Cours ' + this.nbEnCours + ' Nb Suppr ' + this.nbSuppr);
  }

  /**
   * The user who was selected for update
   */
  public aUser: User;

  public users: Array<User>;

  public title: String = new String('Tâches');

   /**throw new Error('Method not implemented.');
    * Invoked just after the component constructor
    */
   ngOnInit(): void {
     this.users = this.collection.getCollection();
     // or... this users = this.collection.users;
     this.masquerTousLesDetails();
   }

  /**
   * Invoke repositionary method to remove the 'task'
   * @param user Task to remove
   */
   public remove(user: User): void {
     this.collection.remove(user);
     this.mesCompteurs.supprMission();
     this.toastr.success('La mission ' + user.libelle + ' est supprimée', 'Bravo !');
     this.nbSuppr = this.nbSuppr + 1;
     if (this.nbEnCours > 0) {
     this.nbEnCours = this.nbEnCours - 1;
     }
   }

  /**
   * Invoke repositionary method to remove the 'task'
   * @param user Task to remove
   */
  public valid(user: User): void {
    this.collection.remove(user);
    this.mesCompteurs.validMission();
    this.toastr.success('La mission ' + user.libelle + ' est validée', 'Bravo !');
    if (this.nbEnCours > 0) {
    this.nbEnCours = this.nbEnCours - 1;
    }
    this.nbValid = this.nbValid + 1;
  }

  /**
   * Check if there is any User to update
   * @return boolean
   */
   public hasUser(): boolean {
    return this.aUser ? true : false;
  }

  /**
   * Manage the update form for a User
   * @param user User object to be updated
   */
  public loadFormFor(user: User) {
    this.aUser = user;
    this.buttonDisabled = true;
    this._setForm();
  }
   /**
    * Empty the local storage
    * @param user Task to remove
    * tslint:disable-next-line: jsdoc-format
    */
  public vider(): void {
    this.users = new Array<User>();
    this.collection.vider();
    this.nbValid = 0;
    this.nbSuppr = 0;
    this.nbEnCours = 0;
    this.toastr.success('Le compteur est réinitialisé', 'C\'est parti !!! ');
    this.reloadPage();
  }

 /** Toogle the hidden status of the details @return void  */
   public toggleStatus(user: User): void {
     if (user.isDetailsHidden === true) {
        user.detailsColor = 'grey';
     } else {
      user.detailsColor = 'white';
     }
     user.isDetailsHidden = !user.isDetailsHidden;
   }

   public masquerTousLesDetails(): void {
    this.users.forEach(user => {
      user.isDetailsHidden = false;
    });
   }

   public receiveUser(user: User) {
     if (user) {
      this.collection.update(this.aUser, user);

      // this.collection.findUser(this.oUser);

     }
     this.masquerTousLesDetails();
    // this.aUser = $event;
    this.aUser = null;
    this.buttonDisabled = false;
   }

   public reloadPage() {
    this.router.navigate(['']);
   }

   private _setForm(): void {
     if (this.aUser) {
       // instanciate a new FormGroup using a FormBuilder
       this.userForm = this.formBuilder.group({
        libelle: [
          this.aUser.libelle,
          [Validators.required,
          Validators.minLength(3)]
        ],
        categorie: [
          this.aUser.categorie,
          [Validators.required,
            Validators.minLength(3)]
        ],
        birthDate: [
          this.aUser.birthDate
        ],
        duree: [
          this.aUser.duree,
          Validators.pattern('^(0|[0-9]*)$')
        ]
      });
     }
   }
}
