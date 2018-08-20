import Vue, {PluginObject} from 'vue';
import {CONFIG} from '../config';

export class ApiService {
  private _count: number[] = [];
  private _busy: boolean = false;
  public get busy(): boolean {
    return this._busy;
  }
  constructor() {}

  public async getProviders(): Promise<string[]>{
    const number = this._count.length + 1;
    this._count.push(number);
    this._busy = true;
    console.log('change busy', this._busy);
    const response = await fetch(CONFIG.apiUrl + 'auth/providers', {method: 'GET'});
    setTimeout(() => {
      this._count.splice(this._count.findIndex(i => i === number), 1);
      this._busy = !!this._count.length;
      console.log('change busy', this._busy);
    }, 5000);
    return await response.json();
  }
}

export const ApiServicePlugin: PluginObject<any> = {
  install (vue: typeof Vue, options: any) {
    vue.apiService = new ApiService();
    vue.prototype.$apiService = Vue.apiService;
  }
};
