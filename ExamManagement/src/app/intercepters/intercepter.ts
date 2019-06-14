import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler} from '@angular/common/http';

import {startWith, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {Observable} from 'rxjs';
import {RequestCacheService} from '../services/request-cache.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCacheService, private loader: Ng4LoadingSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method === 'GET') {
      const cachedResponse = this.cache.get(req);
      if (cachedResponse) {
        return of(cachedResponse);
      } else {
        if (req.url.indexOf('isLoad=false') === -1) {
          this.loader.show();
        }
        return this.sendRequest(req, next, this.cache);
      }
    }
    this.loader.show();
    return this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.loader.hide();
          cache.put(req, event);
        }
      }, () => {
        this.loader.hide();
      })
    );
  }
}
