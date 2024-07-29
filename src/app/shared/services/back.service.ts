import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  tagsChanged = new Subject<string[]>();
  tags: string[] = [];

  constructor(
    private readonly http: HttpClient
  ) {
    
   }


}
