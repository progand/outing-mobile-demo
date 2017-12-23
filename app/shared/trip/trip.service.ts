import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Config } from "../config";
import { Trip } from "./trip";

@Injectable()
export class TripService {
    constructor(private http: Http) { }

    load() {
        return this.http.get(Config.apiUrl + "/models/trips?action=includeRelationships")
            .map(res => res.json())
            .map(data => {
                let list = [];
                const trips = this.deserialize(data);
                trips.forEach((trip) => {
                    list.push(new Trip(trip.id,
                        trip.name,
                        trip.destination,
                        null,
                        null,
                        null,
                        trip.budgetFrom,
                        trip.budgetTo,
                        trip.approvedTravellersCount,
                        trip.partnersReqd,
                        trip.coverPhoto,
                        trip.organiser,
                        new Date(trip.dateStart),
                        new Date(trip.dateEnd),
                        trip.schedule,
                        trip.photos,
                        trip.tags,
                        trip.travellers
                    ));
                });
                return list;
            });
    }

    loadOne(id: String) {
        const promise = this.http.get(Config.apiUrl + "/models/trips/" + id)
            .toPromise()
            .then(res => res.json())
            .then((data:any) => data.trip)
            .then(trip => Promise.all([
                trip,
                this.http.get(Config.apiUrl + "/models/travellers/?ids[]=" + trip.travellers.join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then((data:any) => data.travellers)
            ]))
            .then(([trip, travellers]) => Promise.all([
                trip,
                travellers,
                this.http.get(Config.apiUrl + "/models/users/?ids[]=" + travellers
                    .reduce((result, travellerData) => result.concat([travellerData.user]), [])
                    .join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then((data:any) => data.users)
            ]))
            .then(([trip, travellers, users]) => Promise.all([
                trip,
                travellers,
                users,
                this.http.get(Config.apiUrl + "/models/photos/?ids[]=" + trip.photos
                    .concat(travellers.reduce((result, traveller) => {
                        const user = this.getByValue(users, traveller.user);
                        return result.concat([user.photo]);
                    }, []))
                    .join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then((data:any) => data.photos)
            ]))
            .then(([trip, travellers, users, photos]) => Promise.all([
                trip,
                travellers,
                users.map(user => Object.assign({}, user, {
                    photo: this.getByValue(photos, user.photo)
                })),
                photos
            ]))
            .then(([trip, travellers, users, photos]) => Object.assign({}, trip, {
                coverPhoto: this.getByValue(photos, trip.coverPhoto),
                organiser: this.getByValue(users, trip.organiser),
                photos: trip.photos.map(photoId => this.getByValue(photos, photoId)),
                travellers: trip.travellers
                    .map(travellerId => this.getByValue(travellers, travellerId))
                    .map(traveller => Object.assign({}, traveller, {
                        user: this.getByValue(users, traveller.user)
                    }))
            }));
        return RxObservable.fromPromise(promise);
    }

    deserialize(data: any) {
        const { trips, photos, users } = data;
        const result = trips.map(item => {
            const organiserData = this.getByValue(users, item.organiser);
            const organiser = Object.assign({}, organiserData, {
                photo: this.getByValue(photos, organiserData.photo),
                photos: organiserData.photos.map(photoId => this.getByValue(photos, photoId))
            });
            const trip = Object.assign({}, item, {
                coverPhoto: this.getByValue(photos, item.coverPhoto),
                photos: item.photos.map(photoId => this.getByValue(photos, photoId)),
                organiser
            });
            return trip;
        });

        return result;
    }

    getByValue(collection, fieldValue, fieldName = 'id') {
        return collection.find(item => item[fieldName] === fieldValue);
    }
}