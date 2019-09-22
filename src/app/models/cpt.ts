export class Cpt {
  private _validee: number;
  public get validee(): number {
    return this._validee;
  }
  public set validee(value: number) {
    this._validee = value;
  }
  private _supprimee: number;
  public get supprimee(): number {
    return this._supprimee;
  }
  public set supprimee(value: number) {
    this._supprimee = value;
  }
  private _enCours: number;

  public get enCours(): number {
    return this._enCours;
  }
  public set enCours(value: number) {
    this._enCours = value;
  }

  private _isDetailsHidden: boolean;
  public get isDetailsHidden(): boolean {
    return this._isDetailsHidden;
  }
  public set isDetailsHidden(value: boolean) {
    this._isDetailsHidden = value;
  }

  public transform(cpt: any): Cpt {
    Object.assign(this, cpt);
    return this;
  }
}
