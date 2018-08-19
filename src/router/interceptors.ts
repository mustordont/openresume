import VueResource from 'vue-resource';
import Vue from 'vue';

// Http
Vue.use(VueResource);

(<any>Vue).http.interceptors.push(function(request: VueResource.HttpOptions) {

  // modify headers
  request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
});