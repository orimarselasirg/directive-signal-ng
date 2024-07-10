import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User, UserSingleResponse } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  public http = inject(HttpClient)

  public baseUrl: string = 'https://reqres.in/api/users'

  getUserById(id: number): Observable<User>{
    return this.http.get<UserSingleResponse>(`${this.baseUrl}/${id}`)
    .pipe(
      map( res => res.data),
      tap( console.log )
    )

  }
}
