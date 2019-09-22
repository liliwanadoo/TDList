import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Cpt } from './cpt';

@Injectable({
  providedIn: 'root'
})

export class Compteur {
  // tslint:disable-next-line: variable-name
  private _compteurs: Array<Cpt>;

  public constructor(private storage: LocalStorageService) {
    // Instanciates the compteurs Array
    this._compteurs = new Array<Cpt>();

    // Hydrate the collection with some dummy datas
    this._hydrate();
  }

  /**
   * Add a compteur to the collection
   */
  public add(compteur: Cpt): Compteur {
    this._compteurs.push(compteur); // Add an element to the array of compteurs

    // Just persist all...
    this.storage.set('compteurs', this._compteurs);

    return this;
  }

  public ajoutMission(): Compteur {
    return this.update('A');
  }

  public validMission(): Compteur {
    return this.update('V');
  }

  public supprMission(): Compteur {
    return this.update('S');
  }

  /**
   * update a compteur to the collection
   */
  public update(modeMAJ: string): Compteur {
        console.log(this.storage.NbMissions());
        const creaCpt: Cpt = new Cpt();
        let nbEnCours = 0;
        let nbValid = 0;
        let nbSuppr = 0;

        if (modeMAJ === 'A') {
            nbEnCours = nbEnCours + 1;
          }
        if (modeMAJ === 'V') {
            nbValid = nbValid + 1;
            nbEnCours = -1 ;
          }
        if (modeMAJ === 'S') {
            nbSuppr = nbSuppr + 1;
            nbEnCours = -1;
          }
        creaCpt.supprimee = nbSuppr;
        creaCpt.validee = nbValid;
        creaCpt.enCours = nbEnCours;

        console.log('mesCompteurs ' + creaCpt.validee + ' ' + creaCpt.enCours + ' ' + creaCpt.supprimee);
        this._compteurs.push(creaCpt);

        // Invoke the persistant method
        this.storage.set('compteurs', this._compteurs);

       // return this._compteurs;
        return this;
  }

  public vider(): void {
    this.storage.vider();
  }

  /**
   * Removes a compteur to the collection
   */
  public remove(compteur: Cpt): Compteur {
    // Gets the index value of "compteur" in the array
    const index: number = this._compteurs.indexOf(compteur, 0);
    console.log('mon nouvel index ' + index);

    // If found (index <> -1)
    if (index !== -1) {
      this._compteurs.splice(index, 1); // Removes the index
    }

    // Invoke the persistant method
    this.storage.set('compteurs', this._compteurs);

    return this;
  }

  /**
   * Get a compteur from the collection
   */
  public get(): Cpt {
    return null;
  }

  /** Gets the collection of compteurs @return Array<compteur> */
  public getCollection(): Array<Cpt> {
    return this._compteurs;
  }

  public get compteurs(): Array<Cpt> {
    return this._compteurs;
  }

  public getNbValid(): any {
    let res = 0;
    const compteurs: Array<any> = this.storage.get('compteurs');
    if (compteurs.length) {
     this._compteurs.forEach((compteur: Cpt) => {
       res = compteur.validee + res;
     });
   }
    return res;
  }

  public getNbSuppr(): any {
    let res = 0;
    const compteurs: Array<any> = this.storage.get('compteurs');
    if (compteurs.length) {
     this._compteurs.forEach((compteur: Cpt) => {
       res = compteur.supprimee + res;
     });
   }
    return res;
  }

  public getNbEnCours(): any {
    let res = 0;
    const compteurs: Array<any> = this.storage.get('compteurs');
    if (compteurs.length) {
     this._compteurs.forEach((compteur: Cpt) => {
       res = compteur.enCours + res;
     });
   }
    return res;
  }

/**
 * Retrieve anonymous collection of things...
 * Just think to make real compteur
 */
  private _hydrate(): void {
    // push a new compteur into the collection
   /** let compteur: compteur = new compteur(); // Sets a variable name compteur
    compteur.firstName = 'James';
    compteur.lastName = 'Bond';
    compteur.address = '10, Downing Street';
    compteur.city = 'London';
    compteur.zipCode = '0947';
    compteur.birthDate = new Date('1943-04-12');

    // Push this compteur into collection
    this._compteurs.push(compteur);
    */
   const compteurs: Array<any> = this.storage.get('compteurs');
   if (compteurs.length) {
     compteurs.forEach((compteur: any, index: number) => {
      const transformedcompteur: Cpt = new Cpt();
      this._compteurs.push(transformedcompteur.transform(compteur));
     });
   }
  }
}
