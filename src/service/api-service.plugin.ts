import Vue, {PluginObject} from 'vue';
import {CONFIG} from '../config';
import {IGetProviderRedirect, IGetProviderAuth} from "./interfaces";
import {Dictionary} from "vuex";

interface IError {
  error: string;
  message: string;
  status: number;
}

export class ApiService {
  constructor() {}
  public async getProviders(): Promise<string[]> {
    const response = await fetch(CONFIG.apiUrl + 'auth/providers', {method: 'GET'});
    return await this._parseResponse(response);
  }

  public async getProviderRedirect(provider: string): Promise<IGetProviderRedirect> {
    const response = await fetch(CONFIG.apiUrl + 'auth/' + provider, {method: 'GET'});
    return await this._parseResponse(response);
  }

  public async getAuthToken(provider: string, body: Dictionary<string>): Promise<IGetProviderAuth> {
    const response = await fetch(CONFIG.apiUrl + 'auth/' + provider, {method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(body)});
    return await this._parseResponse(response);
  }

  public async refreshToken(token: string): Promise<IGetProviderAuth> {
    const response = await fetch(CONFIG.apiUrl + 'auth/refresh', {method: 'GET', headers: this._authHeaders});
    return await this._parseResponse(response);
  }

  public async getResume(provider: string): Promise<any> {
    const response = await fetch(CONFIG.apiUrl + '/resume' + provider, {method: 'GET', headers: this._authHeaders});
    return await this._parseResponse(response);
  }

  private _parseResponse(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return response.json()
        .then((result: IError) => Promise.reject(new Error(result.message)));
    }
  }

  private get _authHeaders(): Headers {
    return new Headers({'Authorization': `JWT ${localStorage.getItem('token')}`});
  }
}

export const ApiServicePlugin: PluginObject<any> = {
  install (vue: typeof Vue, options: any) {
    vue.apiService = new ApiService();
    vue.prototype.$apiService = vue.apiService;
  }
};
