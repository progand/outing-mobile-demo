import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Config } from "../config";
import { Conversation } from "./conversation";
import { AuthService } from "../auth/auth.service";

const API_URL = Config.apiUrl;

@Injectable()
export class ConversationService {
    constructor(private authService: AuthService, private http: Http) { }

    load() {
        const headers = this.authService.getAuthorizationHTTPHeaders();
        const promise = this.http.get(API_URL + "/models/conversations", { headers: headers })
            .toPromise()
            .then(res => res.json())
            .then(data => data.conversations)
            .then((conversations:Array<any>) => conversations.filter(conversationData => conversationData.messages && conversationData.messages.length))
            .then(conversations => Promise.all([
                conversations,
                this.http.get(Config.apiUrl + "/models/trips/?ids[]=" + conversations
                    .reduce((result, conversationData) => conversationData.trip ? result.concat([conversationData.trip]) : result, [])
                    .join("&ids[]="), { headers: headers })
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.trips),
                this.http.get(Config.apiUrl + "/models/users/?ids[]=" + conversations
                    .reduce((result, conversationData) => result.concat(conversationData.participants || []), [])
                    .join("&ids[]="), { headers: headers })
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.users),
                this.http.get(Config.apiUrl + "/models/messages/?ids[]=" + conversations
                    .reduce((result, conversationData) => result.concat(conversationData.messages || []), [])
                    .join("&ids[]="), { headers: headers })
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.messages),
            ]))
            .then(([conversations, trips, users, messages]) => Promise.all([
                conversations,
                trips,
                users,
                messages,
                this.http.get(Config.apiUrl + "/models/photos/?ids[]=" + trips
                    .reduce((result, trip) => result.concat([trip.coverPhoto]), [])
                    .concat(users.reduce((result, user) => result.concat([user.photo]), []))
                    .join("&ids[]="))
                    .toPromise()
                    .then(res => res.json())
                    .then(data => data.photos)
            ]))
            .then(([conversations, trips, users, messages, photos]) => Promise.all([
                conversations,
                trips.map(trip => Object.assign({}, trip, {
                    coverPhoto: this.getByValue(photos, trip.coverPhoto)
                })),
                users.map(user => Object.assign({}, user, {
                    photo: this.getByValue(photos, user.photo)
                })),
                messages
            ]))
            .then(([conversations, trips, users, messages]) => conversations.map(conversation => Object.assign({}, conversation, {
                trip: this.getByValue(trips, conversation.trip),
                participants: (conversation.participants || []).map(userId => this.getByValue(users, userId)),
                messages: (conversation.messages || [])
                    .map(messageId => this.getByValue(messages, messageId))
                    .map(message => Object.assign({}, message, {
                        sender: this.getByValue(users, message.sender)
                    }))
                    .sort((message1, message2) => message1.createdAt < message2.createdAt ? 1 : -1),
            })).sort(this.sortByLastMessageDate));

        return RxObservable.fromPromise(promise);
    }

    getByValue(collection, fieldValue, fieldName = 'id') {
        return collection.find(item => item[fieldName] === fieldValue);
    }

    sortByLastMessageDate(c1, c2){
        const lastMessage1 = c1&& c1.messages && c1.messages.length && c1.messages[0];
        const lastMessage2 = c2&& c2.messages && c2.messages.length && c2.messages[0];
        return lastMessage1.createdAt < lastMessage2.createdAt ? 1 : -1;
    }
}