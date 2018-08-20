import {Route} from 'vue-router';

export function authGuard(to: Route, from: Route, next: Function): void {
  if(to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token') == null) {
      next({
        name: 'login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const localUser = localStorage.getItem('user');
      next();
      /*
      if (localUser) {
        let user = JSON.parse(localUser);
        if(to.matched.some(record => record.meta.is_admin)) {
          if(user.is_admin == 1){
            next();
          }
          else{
            next({ name: 'userboard'});
          }
        }
      } else {
        next();
      }
      */
    }
  }
};
