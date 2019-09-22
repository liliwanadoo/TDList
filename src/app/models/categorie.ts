export class Categorie {
  private _libelle: string;
  public get libelle(): string {
    return this._libelle;
  }
  public set libelle(value: string) {
    this._libelle = value;
  }

  public transform(categorie: any): Categorie {
    Object.assign(this, categorie);
    return this;
  }
}
