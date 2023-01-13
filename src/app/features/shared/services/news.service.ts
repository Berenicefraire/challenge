import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharsService {
  constructor(private http: HttpClient) { }
  
  getCharList(limit: number):Observable<any> {
    const apiCharsUrl = environment.apiCharsUrl;
    const charList = this._getRandomList(limit);
    return this.http.get(`${apiCharsUrl}/api/character/${charList}`);
  }

  private _getRandomList(limit: number){
    // Generete a list of ids between 1 and 42
    const arrayList = Array.from({ length: limit }, () => Math.floor(Math.random() * 42));
    // If we found 0 we will raplace for 1
    const index = arrayList.indexOf(0);
    if(index !== 1) {
      arrayList[index] = 1;
    }
    // TODO: A fix when a list have duplicate numbers
    return arrayList.toString();
  }

}
