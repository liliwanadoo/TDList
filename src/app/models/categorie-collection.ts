import { Categorie } from './categorie';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class CategorieCollection {
  private _categories: Array<Categorie>;

  public constructor(private storage: LocalStorageService) {
    // Instanciates the Categories Array
    this._categories = new Array<Categorie>();

    // Hydrate the collection with some dummy datas
    this._hydrate();
  }

 /**
   * Add a Categorie to the collection
   */
  public add(categorie: Categorie): CategorieCollection {
    this._categories.push(categorie); // Add an element to the array of Categories
    this._categories.sort();
    // Just persist all...
    this.storage.set('Categories', this._categories);

    return this;
  }

   /**
   * Removes a categorie to the collection
   */
  public remove(categorie: Categorie): CategorieCollection {
    // Gets the index value of "categorie" in the array
    const index: number = this._categories.indexOf(categorie, 0);
    console.log('mon nouvel index ' + index);

    // If found (index <> -1)
    if (index !== -1) {
      this._categories.splice(index, 1); // Removes the index
    }

    // Invoke the persistant method
    this.storage.set('categories', this._categories);

    return this;
  }

  /**
   * Get a categorie from the collection
   */
  public get(): Categorie {
    return null;
  }

    /** Gets the collection of categories @return Array<categorie> */
    public getCollection(): Array<Categorie> {
      return this._categories;
    }

    public get categories(): Array<Categorie> {
      return this._categories;
    }

/**
 * Retrieve anonymous collection of things...
 * Just think to make real categorie
 */
private _hydrate(): void {
  // push a new categorie into the collection
 const categories: Array<any> = this.storage.get('categories');
 if (categories.length) {
   categories.forEach((categorie: any, index: number) => {
    const transformedcategorie: Categorie = new categorie();
    this._categories.push(transformedcategorie.transform(categories));
    this._categories.sort();
   });
 }
}

  /**
   * update a categorie to the collection
   */
  public update(oldcategorie: Categorie, newcategorie: Categorie): CategorieCollection {
    // Gets the index value of "categorie" in the array
    const index: number = this._categories.indexOf(oldcategorie, 0);
    console.log('mon index ancien ' + index);
    const newIndex: number = this._categories.indexOf(newcategorie, 0);
    console.log('mon nouvel index ' + newIndex);

    // If found (index <> -1)
    if (index !== -1) {
      console.log('mon index ' + index);
      this._categories.splice(index, 1); // Removes the index
      this._categories.push(newcategorie);  // Adds the categorie
    }

    this._categories.sort();

    // Invoke the persistant method
    this.storage.set('categories', this._categories);

    return this;
}
}
