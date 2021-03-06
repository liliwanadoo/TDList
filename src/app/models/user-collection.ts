import { User } from './user';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class UserCollection {
  // tslint:disable-next-line: variable-name
  private _users: Array<User>;

  public constructor(private storage: LocalStorageService) {
    // Instanciates the Users Array
    this._users = new Array<User>();

    // Hydrate the collection with some dummy datas
    this._hydrate();
  }

  /**
   * Add a user to the collection
   */
  public add(user: User): UserCollection {
    this._users.push(user); // Add an element to the array of users

    // Just persist all...
    this.storage.set('users', this._users);

    return this;
  }

public findUser(user: User) {
  const index: number = this._users.indexOf(user, 0);
  console.log('mon index ancien ' + index);
}

  /**
   * update a user to the collection
   */
  public update(oldUser: User, newUser: User): UserCollection {
        // Gets the index value of "User" in the array
        const index: number = this._users.indexOf(oldUser, 0);
        console.log('mon index ancien ' + index);
        const newIndex: number = this._users.indexOf(newUser, 0);
        console.log('mon nouvel index ' + newIndex);

        // If found (index <> -1)
        if (index !== -1) {
          console.log('mon index ' + index);
          this._users.splice(index, 1); // Removes the index
          this._users.push(newUser);  // Adds the user
        }

        // Invoke the persistant method
        this._users.sort();
        this.storage.set('users', this._users);

        return this;
  }

  public vider(): void {
    this.storage.vider();
  }

  /**
   * Removes a user to the collection
   */
  public remove(user: User): UserCollection {
    // Gets the index value of "User" in the array
    const index: number = this._users.indexOf(user, 0);
    console.log('mon nouvel index ' + index);

    // If found (index <> -1)
    if (index !== -1) {
      this._users.splice(index, 1); // Removes the index
    }

    this._users.sort();
    // Invoke the persistant method
    this.storage.set('users', this._users);

    return this;
  }

  /**
   * Get a user from the collection
   */
  public get(): User {
    return null;
  }

  /** Gets the collection of users @return Array<User> */
  public getCollection(): Array<User> {
    return this._users;
  }

  public get users(): Array<User> {
    this._users.sort();
    return this._users;
  }

/**
 * Retrieve anonymous collection of things...
 * Just think to make real User
 */
  private _hydrate(): void {
    // push a new User into the collection
   /** let user: User = new User(); // Sets a variable name user
    user.firstName = 'James';
    user.lastName = 'Bond';
    user.address = '10, Downing Street';
    user.city = 'London';
    user.zipCode = '0947';
    user.birthDate = new Date('1943-04-12');

    // Push this user into collection
    this._users.push(user);
    */
   const users: Array<any> = this.storage.get('users');
   if (users.length) {
     users.forEach((user: any, index: number) => {
      const transformedUser: User = new User();
      this._users.push(transformedUser.transform(user));
     });
     this._users.sort();
   }
  }

  private calculRetard(maDate: Date): number {
      // Fake current date
      const birthDate: moment.Moment = moment();

      // Convert string date in Moment date (value <=> user.birthDate for example)
      const today: moment.Moment = moment(maDate);

      // Get difference between two dates with moment
      let theAge: number = today.diff(birthDate, 'day');
      console.log('Age de ma mission : ' + theAge);

      if (theAge < 0) {
        return theAge;
      }
      else
      {
        return 0;
      }
    }

  public ageDuBacklog(): string {
    const users: Array<any> = this.storage.get('users');
    let maDate: any;
    let monTotal = 0;
    let monRes = '';
    if (this._users.length) {
      this._users.forEach((myUser: User) => {
      maDate = myUser.birthDate;
      monTotal = monTotal + this.calculRetard(maDate);
      });
      if (monTotal === 0) {
        monRes = 'Le backlog n\'a pas de retard, bravo !';
      }
      else
      {
        monRes = 'Le backlog a : ' + monTotal + ' jours.';
      }
      return monRes;
   }
    return 'Le backlog est vide';
  }
}
