export class User {
  private _libelle: string;
  public get libelle(): string {
    return this._libelle;
  }
  public set libelle(value: string) {
    this._libelle = value;
  }
  private _categorie: string;
  public get categorie(): string {
    return this._categorie;
  }
  public set categorie(value: string) {
    this._categorie = value;
  }
  private _birthDate: Date;

  public get birthDate(): Date {
    return this._birthDate;
  }
  public set birthDate(value: Date) {
    this._birthDate = value;
  }
  private _duree: BigInteger;
  public get duree(): BigInteger {
    return this._duree;
  }
  public set duree(value: BigInteger) {
    this._duree = value;
  }
  private _isDetailsHidden: boolean;
  public get isDetailsHidden(): boolean {
    return this._isDetailsHidden;
  }

  public set isDetailsHidden(value: boolean) {
    this._isDetailsHidden = value;
  }

  private _detailsColor: string;
  public get detailsColor(): string {
    return this._detailsColor;
  }

  public set detailsColor(value: string) {
    this._detailsColor = value;
  }


  public transform(user: any): User {
    Object.assign(this, user);
    return this;
  }
}
