import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Trip } from "./trip";

@Injectable()
export class TripListService {
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
                        null,
                        null,
                        null,
                    ));
                });
                return list;
            })
            .catch(this.handleErrors);
    }

    loadOne(id: String) {
        const promise = this.http.get(Config.apiUrl + "/models/trips/" + id)
            .toPromise()
            .then(res => res.json())
            .then(data => data.trip)
            .then(trip => Promise.all([
                trip,
                this.http.get(Config.apiUrl + "/models/travellers/?ids[]=" + trip.travellers.join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.travellers)
            ]))
            .then(([trip, travellers]) => Promise.all([
                trip,
                travellers,
                this.http.get(Config.apiUrl + "/models/users/?ids[]=" + travellers
                    .reduce((result, travellerData) => result.concat([travellerData.user]), [])
                    .join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.users)
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
                    .then(data => data.photos)
            ]))
            .then(([trip, travellers, users, photos]) => Object.assign({}, trip, {
                coverPhoto: this.getByValue(photos, trip.coverPhoto),
                photos: trip.photos.map(photoId => this.getByValue(photos, photoId)),
                travellers: trip.travellers
                    .map(travellerId => this.getByValue(travellers, travellerId))
                    .map(traveller => {
                        const user = this.getByValue(users, traveller.user);
                        //console.dir(user);
                        //console.dir(photos)
                        return Object.assign({}, traveller, {
                            user: Object.assign({}, user, {
                                photo: this.getByValue(photos, user.photo)
                            })
                        })
                    })
            }));
        return Observable.fromPromise(promise);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
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