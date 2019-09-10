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
  private _dateEcheance: Date;
  public get dateEcheance(): Date {
    return this._dateEcheance;
  }
  public set dateEcheance(value: Date) {
    this._dateEcheance = value;
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

  public transform(user: any): User {
    Object.assign(this, user);
    return this;
  }
}
