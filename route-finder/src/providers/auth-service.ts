import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  public login(credentials) {
    console.log("auth-service - login method");

    if (credentials.email === null || credentials.password === null) {
      console.log("auth-service - checou parametros");

      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        console.log("auth-service - login success");

        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "user" && credentials.email === "user@gmail.com");
        this.currentUser = new User('user@gmail.com', 'user');

        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
