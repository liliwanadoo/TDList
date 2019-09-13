export class Objectif {
  // objectif du sprit
  private _objSprint: string;
  public get objSprint(): string {
    return this._objSprint;
  }
  public set objSprint(value: string) {
    this._objSprint = value;
  }
  // idée du produit
  private _idee: string;
  public get idee(): string {
    return this._idee;
  }
  public set idee(value: string) {
    this._idee = value;
  }
  // capacité de travail
  private _capacite: string;
  public get capacite(): string {
    return this._capacite;
  }
  public set capacite(value: string) {
    this._capacite = value;
  }
}
