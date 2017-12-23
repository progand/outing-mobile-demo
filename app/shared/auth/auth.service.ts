import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "application-settings";

import { Config } from "../config";

const TOKEN: string = "token";
const API_URL = Config.apiUrl;

@Injectable()
export class AuthService {
    private token: String = null;
    private profile = null;

    constructor(private http: Http) {
        this.fetchToken();
        this.requestProfile();
    }

    public login(email: String, password: String) {
        const data = { email, password };
        const promise = this.http.post(API_URL + "/auth/basic", data)
            .toPromise()
            .then(res => res.json())
            .then((data:any) => this.updateToken(data && data.signed))
            .then(() => this.requestProfile());

        return RxObservable.fromPromise(promise);
    }

    public logout() {
        this.updateToken(null);
        this.requestProfile();
    }

    public isAuthenticated() {
        return !!this.token;
    }

    public getProfile() {
        return this.profile || {};
    }

    public getToken() {
        return this.token;
    }

    public getAuthorizationHTTPHeaders(){
        const headers = new Headers();
        if(this.token){
            headers.append("authorization", "Bearer " + this.token);
        }
        return headers;
    }

    private updateToken(token) {
        this.token = token;
        if (token) {
            setString(TOKEN, token);
        } else {
            remove(TOKEN);
        }
        return token;
    }

    private fetchToken() {
        this.token = getString(TOKEN);
    }

    private requestProfile() {
        if (!this.token) {
            this.profile = null;
            return Promise.resolve();
        }
        const headers = this.getAuthorizationHTTPHeaders();
        const promise = this.http.get(API_URL + "/auth/profile", { headers: headers })
            .toPromise()
            .then(res => res.json())
            .then((profile:any) => {
                this.profile = profile;
                return profile;
            });
        return promise;
    }
}