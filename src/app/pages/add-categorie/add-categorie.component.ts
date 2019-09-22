import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { CategorieCollection } from 'src/app/models/categorie-collection';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {


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
   public categorieForm: FormGroup;

   /**
    *
    * @param formBuilder As Dependency Injection
    */
  constructor(private formBuilder: FormBuilder,
              private collection: CategorieCollection,
              private toastr: ToastrService,
              ) { }
/**
 * Controls getter
 */

 public get libelle(): AbstractControl {
   return this.categorieForm.controls.libelle;
 }

  ngOnInit() {
    this.categorieForm = this.formBuilder.group({
      libelle: [
        '',
        [Validators.required,
          Validators.minLength(3)]
      ]
    });
  }
  public submit() {
    if (this.categorieForm.valid) {
      console.log('Yo.....Datas are : ' + JSON.stringify(this.categorieForm.value));

      // First, instanciate a brand new categorie and feed with form values
      const brandNewcategorie: Categorie = new Categorie();
      brandNewcategorie.libelle = this.libelle.value;

    // Second... (special thx for Felice) persist this categorie into persistent object
      this.collection.add(brandNewcategorie);

      this.toastr.success('La catégorie ' + brandNewcategorie.libelle + ' est créée', 'Info');

      this.libelle.reset();

    // Third go back to home...
    // this.router.navigate(['']);
    // Cherry on cake : put a toast to inform the end categorie...
    } else {
      Object.keys(this.categorieForm.controls).forEach(key => {
        console.log(key + ' [ ' + JSON.stringify(this.categorieForm.controls[key].errors) + '] : ' + this.categorieForm.controls[key].status);
      });

    }
  }
}
