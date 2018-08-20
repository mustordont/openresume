import {$http, $resource, HttpOptions, HttpResponse} from "../../node_modules/vue-resource/types/vue_resource";
import {ApiService} from "./api-service";

declare module "vue/types/vue" {

  interface VueConstructor {
    http: {
      (options: HttpOptions): PromiseLike<HttpResponse>;
      get: $http;
      post: $http;
      put: $http;
      patch: $http;
      delete: $http;
      jsonp: $http;
    };
    resource: $resource;
    apiService: ApiService;
    $apiService: ApiService;
  }

  interface Vue {
    apiService: ApiService;
    $apiService: ApiService;
  }
}
