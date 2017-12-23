import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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
            .then(([user, photos, travellers]) => Promise.all([
                user,
                photos,
                travellers,
                this.http.get(Config.apiUrl + "/models/trips/?ids[]=" + travellers
                    .reduce((result, travellerData) => result.concat([travellerData.trip]), [])
                    .join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.trips)
            ]))
            .then(([user, photos, travellers, trips = []]) => Object.assign({}, user, {
                coverPhoto: this.getByValue(photos, user.coverPhoto),
                photo: this.getByValue(photos, user.photo),
                photos: user.photos.map(photoId => this.getByValue(photos, photoId)),
                travellers: user.travellers
                    .map(travellerId => this.getByValue(travellers, travellerId))
                    .map(traveller => Object.assign({}, traveller, {
                        trip: this.getByValue(trips, traveller.trip)
                    }))
            }));
        return RxObservable.fromPromise(promise);
    }

    getByValue(collection, fieldValue, fieldName = 'id') {
        return collection.find(item => item[fieldName] === fieldValue);
    }

    login(email: String, password: String) {
        const data = { email, password };
        const promise = this.http.post(Config.apiUrl + "/auth/basic", data)
            .toPromise()
            .then(res => res.json());

        return RxObservable.fromPromise(promise);
    }
}