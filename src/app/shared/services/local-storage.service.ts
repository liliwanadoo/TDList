import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public set(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public get(key: string): any {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    }
    return [];
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public vider(): void {
    localStorage.clear();
  }

  public NbMissions(): any {
    return JSON.parse(localStorage.getItem(localStorage.key(1)));
  }
}
