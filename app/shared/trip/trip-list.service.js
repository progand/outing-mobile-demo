"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var config_1 = require("../config");
var trip_1 = require("./trip");
var TripListService = (function () {
    function TripListService(http) {
        this.http = http;
    }
    TripListService.prototype.load = function () {
        var _this = this;
        return this.http.get(config_1.Config.apiUrl + "/models/trips?action=includeRelationships")
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var list = [];
            var trips = _this.deserialize(data);
            trips.forEach(function (trip) {
                list.push(new trip_1.Trip(trip.id, trip.name, trip.destination, null, null, null, trip.budgetFrom, trip.budgetTo, trip.approvedTravellersCount, trip.partnersReqd, trip.coverPhoto, trip.organiser, new Date(trip.dateStart), new Date(trip.dateEnd), null, null, null));
            });
            return list;
        })
            .catch(this.handleErrors);
    };
    TripListService.prototype.loadOne = function (id) {
        var _this = this;
        var promise = this.http.get(config_1.Config.apiUrl + "/models/trips/" + id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data.trip; })
            .then(function (trip) { return Promise.all([
            trip,
            _this.http.get(config_1.Config.apiUrl + "/models/travellers/?ids[]=" + trip.travellers.join("&ids[]="))
                .toPromise()
                .then(function (res) { return res.json(); })
                .then(function (data) { return data.travellers; })
        ]); })
            .then(function (_a) {
            var trip = _a[0], travellers = _a[1];
            return Promise.all([
                trip,
                travellers,
                _this.http.get(config_1.Config.apiUrl + "/models/users/?ids[]=" + travellers
                    .reduce(function (result, travellerData) { return result.concat([travellerData.user]); }, [])
                    .join("&ids[]="))
                    .toPromise()
                    .then(function (res) { return res.json(); })
                    .then(function (data) { return data.users; })
            ]);
        })
            .then(function (_a) {
            var trip = _a[0], travellers = _a[1], users = _a[2];
            return Promise.all([
                trip,
                travellers,
                users,
                _this.http.get(config_1.Config.apiUrl + "/models/photos/?ids[]=" + trip.photos
                    .concat(travellers.reduce(function (result, traveller) {
                    var user = _this.getByValue(users, traveller.user);
                    return result.concat([user.photo]);
                }, []))
                    .join("&ids[]="))
                    .toPromise()
                    .then(function (res) { return res.json(); })
                    .then(function (data) { return data.photos; })
            ]);
        })
            .then(function (_a) {
            var trip = _a[0], travellers = _a[1], users = _a[2], photos = _a[3];
            return Object.assign({}, trip, {
                coverPhoto: _this.getByValue(photos, trip.coverPhoto),
                photos: trip.photos.map(function (photoId) { return _this.getByValue(photos, photoId); }),
                travellers: trip.travellers
                    .map(function (travellerId) { return _this.getByValue(travellers, travellerId); })
                    .map(function (traveller) {
                    var user = _this.getByValue(users, traveller.user);
                    //console.dir(user);
                    //console.dir(photos)
                    return Object.assign({}, traveller, {
                        user: Object.assign({}, user, {
                            photo: _this.getByValue(photos, user.photo)
                        })
                    });
                })
            });
        });
        return Rx_1.Observable.fromPromise(promise);
    };
    TripListService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    TripListService.prototype.deserialize = function (data) {
        var _this = this;
        var trips = data.trips, photos = data.photos, users = data.users;
        var result = trips.map(function (item) {
            var organiserData = _this.getByValue(users, item.organiser);
            var organiser = Object.assign({}, organiserData, {
                photo: _this.getByValue(photos, organiserData.photo),
                photos: organiserData.photos.map(function (photoId) { return _this.getByValue(photos, photoId); })
            });
            var trip = Object.assign({}, item, {
                coverPhoto: _this.getByValue(photos, item.coverPhoto),
                photos: item.photos.map(function (photoId) { return _this.getByValue(photos, photoId); }),
                organiser: organiser
            });
            return trip;
        });
        return result;
    };
    TripListService.prototype.getByValue = function (collection, fieldValue, fieldName) {
        if (fieldName === void 0) { fieldName = 'id'; }
        return collection.find(function (item) { return item[fieldName] === fieldValue; });
    };
    TripListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TripListService);
    return TripListService;
}());
exports.TripListService = TripListService;
