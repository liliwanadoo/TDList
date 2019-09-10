import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class BirthDateValidatorService {

  constructor(private http: HttpClient) {
    this.http.get(
      'http://worldclockapi.com/api/json/utc/now'
    ).subscribe((response: any) => {
      console.log('Hola, today is : ' + response.currentDateTime);
    });
  }


  public isLowerThan(dateCtrl: FormControl): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.get(
        'http://worldclockapi.com/api/json/utc/now'
      ).subscribe((response: any) => {
        console.log('Hola, today is : ' + response.currentDateTime);
        // My logic here
        const serverDate = new Date(response.currentDateTime);
        const userDate = new Date(dateCtrl.value);

        if (userDate < serverDate) {
          resolve({isLowerThan: false}); //Take promise...
        } else {
          resolve(null);
        }
    });
  });
}
}
