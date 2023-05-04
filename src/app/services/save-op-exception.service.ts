import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Operation} from "../model/operation";

@Injectable({
  providedIn: 'root'
})
export class SaveOpExceptionService {
  backendHost :String="http://localhost:8085"
  constructor(private http: HttpClient) {}

  createNewOperation(operation: Operation) {
    return this.http.post(this.backendHost + "/operations" ,operation)
      .pipe(
        catchError(error => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = `Erreur : ${error.error.message}`;
          } else {
            // Erreur côté serveur
            errorMessage = `Erreur ${error.status} : ${error.error}`;
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
