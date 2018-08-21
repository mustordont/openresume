export class ProviderModel {
  public readonly name: string = '';
  redirectUrl: string|null = null;
  logged: boolean = false;
  constructor(data: string|ProviderModel) {
    if (data instanceof ProviderModel) {
      Object.assign(this, data);
    } else {
      this.name = data;
    }
  }
}
