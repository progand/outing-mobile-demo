import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { User } from "./user";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    loadOne(id: String) {
        const promise = this.http.get(Config.apiUrl + "/models/users/" + id)
            .toPromise()
            .then(res => res.json())
            .then(data => data.user)
            .then(user => Promise.all([
                user,
                this.http.get(Config.apiUrl + "/models/photos/?ids[]=" + user.photos
                    .concat(user.coverPhoto, user.photo)
                    .join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.photos),
                this.http.get(Config.apiUrl + "/models/travellers/?ids[]=" + user.travellers.join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.travellers),

            ]))
            .then(([user, photos, travellers]) => Object.assign({}, user, {
                coverPhoto: this.getByValue(photos, user.coverPhoto),
                photo: this.getByValue(photos, user.photo),
                photos: user.photos.map(photoId => this.getByValue(photos, photoId)),
                travellers: user.travellers
                    .map(travellerId => this.getByValue(travellers, travellerId))
            }));
        return Observable.fromPromise(promise);
    }

    getByValue(collection, fieldValue, fieldName = 'id') {
        return collection.find(item => item[fieldName] === fieldValue);
    }
}