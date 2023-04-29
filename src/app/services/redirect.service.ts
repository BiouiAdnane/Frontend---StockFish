import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  private redirectTo!: string;

  constructor() { }

  setRedirectTo(route: string): void {
    this.redirectTo = route;
  }

  getRedirectTo(): string {
    return this.redirectTo;
  }
}
