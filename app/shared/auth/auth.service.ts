import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
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
    token: String = null;
    profile = null;

    constructor(private http: Http) {
        this.fetchToken();
        this.requestProfile();
    }

    public login(email: String, password: String) {
        const data = { email, password };
        const promise = this.http.post(API_URL + "/auth/basic", data)
            .toPromise()
            .then(res => res.json())
            .then(data => this.updateToken(data && data.signed))
            .then(() => this.requestProfile());

        return Observable.fromPromise(promise);
    }

    public logout() {
        this.updateToken(null);
        this.requestProfile();
    }

    public isAuthenticated() {
        return !!this.token;
    }

    public getProfile(){
        return this.profile || {};
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
        console.log(`Fetched token ${this.token}`);
    }

    private requestProfile() {
        if (!this.token) {
            this.profile = null;
            return Promise.resolve();
        }
        let headers = new Headers();
        // set headers here e.g.
        headers.append("authorization", "Bearer " + this.token);
        const promise = this.http.get(API_URL + "/auth/profile", { headers: headers })
            .toPromise()
            .then(res => res.json())
            .then(profile => {
                this.profile = profile;
                return profile;
            });
        return promise;
    }
}