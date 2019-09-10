import { Component, OnInit } from '@angular/core';
import { UserCollection } from 'src/app/models/user-collection';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public dateDuJour: any;

  public constructor(
    private collection: UserCollection, private toastr: ToastrService, private http: HttpClient
  ) {
    this.http.get(
      'http://worldclockapi.com/api/json/utc/now'
    ).subscribe((response: any) => {this.dateDuJour = response.currentDateTime; });
  }

   public users: Array<User>;

   public title: String = new String('Tâches');

   /**throw new Error('Method not implemented.');
    * Invoked just after the component constructor
    */
   ngOnInit(): void {
     this.users = this.collection.getCollection();
     // or... this users = this.collection.users;
   }
  /**
   * Invoke repositionary method to remove the 'task'
   * @param user Task to remove
   */
   public remove(user: User): void {
     this.collection.remove(user);
     this.toastr.success('La tâche ' + user.libelle + ' est supprimée', 'Info');
   }

    /**
   * Empty the local storage
   * @param user Task to remove
   */
  public vider(): void {
    this.collection.vider();
    this.toastr.success('Toutes les tâches sont supprimées', 'Info');
  }

 /** Toogle the hidden status of the details @return void  */
   public toggleStatus(user: User): void {
     user.isDetailsHidden = !user.isDetailsHidden;
   }

}
