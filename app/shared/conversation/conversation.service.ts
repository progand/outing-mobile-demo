import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Conversation } from "./conversation";

@Injectable()
export class ConversationService {
    constructor(private http: Http) { }

    load() {
        const promise = this.http.get(Config.apiUrl + "/models/conversations")
            .toPromise()
            .then(res => res.json())
            .then(data => data.conversations)

        return Observable.fromPromise(promise);
    }

    getByValue(collection, fieldValue, fieldName = 'id') {
        return collection.find(item => item[fieldName] === fieldValue);
    }
}