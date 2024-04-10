import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('auth')) {
    let decoded: any = jwtDecode(String(sessionStorage.getItem('auth')));
    if (route.url[0].path === 'user' && decoded['type'] === 'user') {
      return true;
    } else if (route.url[0].path === 'admin' && decoded['type'] === 'admin') {
      return true;
    }
  }
  new Router().navigate(['login']);
  return false;
};
