import { Component, OnInit } from '@angular/core';
import { UserCollection } from 'src/app/models/user-collection';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public constructor(
    private collection: UserCollection, private toastr: ToastrService
  ) {}

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
     this.toastr.success('Tâche supprimée', 'Info');
   }

 /** Toogle the hidden status of the details @return void  */
   public toggleStatus(user: User): void {
     user.isDetailsHidden = !user.isDetailsHidden;
   }

}
