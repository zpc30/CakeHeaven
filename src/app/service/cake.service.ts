import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cake } from '../model/cake.model';
import { Message } from '../model/message.model';
import { Slide } from '../model/slide.model';
import { User } from '../model/user.model';

const baseUrl = 'http://localhost:3000/api/cakes'
const ingUrl = 'http://localhost:3000/api/ingredients'
const slideUrl = 'http://localhost:3000/api/slideshow'
const userUrl = 'http://localhost:3000/api/user'
const msgUrl = 'http://localhost:3000/api/messages'

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private httpCake: HttpClient) { }

  getCakes(params?:any): Observable<Cake[]> {
    let options = {
      params: new HttpParams()
        .set('sort', params.sort || 'name')
        .set('sortDirection', params.sortDirection || '')
    }
    return this.httpCake.get(baseUrl,options).pipe(map((data:any)=> {
      return data && data.map((el:any)=> new Cake(el))
    }))
  }

  getIng(): Observable<any> {
    return this.httpCake.get(ingUrl)
  }

  getFilter(params?:any): Observable<Cake[]> {
    let options = {
      params: new HttpParams()
        .set('filter', params.filter && JSON.stringify(params.filter) || 'chocolate')
    }
    return this.httpCake.get(baseUrl, options).pipe(map((data:any)=> {
      return data && data.map((el:any)=> new Cake(el))
    }))
  }

  getCake(id:number): Observable<any> {
    return this.httpCake.get(baseUrl + '/' + id).pipe(map((data:any)=>{
      return new Cake(data)
    }))
  }
  getSlide(): Observable<Slide[]> {
    return this.httpCake.get(slideUrl).pipe(map((data:any)=> {
      return data && data.map((el:any)=> new Slide(el))
    }))
  }
  getUser(id:number): Observable<User[]> {
    return this.httpCake.get(userUrl).pipe(map((data:any)=> {
      return data && data.map((el:any) => new User(el))
    }))
  }

  postMsg(msg:Message): Observable<Message> {
    return this.httpCake.post(msgUrl, msg).pipe(map((data:any)=> {
      return new Message(data)
    }))
  }
  changeUser(user: User): Observable<any> {
    return this.httpCake.put(userUrl + '/' + user._id, user)
  }
}