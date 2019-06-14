import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../global';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) {
  }

  getLevel() {
    return this.http.get(GlobalVariable.BASE_API + 'Resource/GetLevels?isCache=true');
  }
}
