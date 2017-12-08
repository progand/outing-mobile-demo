"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("tns-core-modules/platform");
var page_1 = require("ui/page");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("ImageSwipe", function () { return require("nativescript-image-swipe/image-swipe").ImageSwipe; });
var trip_list_service_1 = require("../../shared/trip/trip-list.service");
var TripComponent = (function () {
    function TripComponent(tripService, page, route) {
        this.tripService = tripService;
        this.page = page;
        this.route = route;
        this.maxItems = 6;
        this.imageHeight = 219 * platform_1.screen.mainScreen.widthDIPs / 360;
        this.isLoading = false;
        this.isLoaded = false;
        this.error = null;
        this.tripId = this.route.snapshot.paramMap.get('id');
    }
    TripComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    TripComponent.prototype.refresh = function () {
        var _this = this;
        this.isLoading = true;
        this.error = null;
        this.tripService.loadOne(this.tripId)
            .subscribe(function (loadedTrip) {
            _this.updateData(loadedTrip);
            _this.isLoading = false;
            _this.isLoaded = true;
        }, function (err) {
            _this.error = err;
            _this.isLoading = false;
        });
    };
    TripComponent.prototype.refreshTrip = function (args) {
        var _this = this;
        var pullRefresh = args.object;
        this.tripService.loadOne(this.tripId)
            .subscribe(function (loadedTrip) {
            _this.updateData(loadedTrip);
            pullRefresh.refreshing = false;
        }, function (err) {
            _this.error = err;
            _this.isLoading = false;
        });
    };
    TripComponent.prototype.updateData = function (trip) {
        var _this = this;
        this.trip = trip;
        this.page.actionBar.title = this.trip.name;
        this.images = this.trip.photos.map(function (photo) { return ({ url: _this.getPhoto(photo) }); });
    };
    TripComponent.prototype.getPhoto = function (photo, size) {
        if (size === void 0) { size = "default"; }
        var url = photo.sizes && photo.sizes[size] || photo.url;
        return url;
    };
    TripComponent.prototype.dateInterval = function (trip) {
        var start = new Date(trip.dateStart);
        var end = new Date(trip.dateEnd);
        return start.toDateString() + " - " + end.toDateString();
    };
    TripComponent.prototype.partnersCount = function (trip) {
        return trip.approvedTravellersCount + "/" + trip.partnersReqd + " Adventurers";
    };
    TripComponent.prototype.tags = function (trip) {
        return trip.tags.join(' ');
    };
    TripComponent.prototype.budget = function (trip) {
        return "\u00A5" + trip.budgetFrom + " - " + trip.budgetTo;
    };
    TripComponent.prototype.travellerInfo = function (traveller) {
        if (traveller.coorganizer) {
            return 'Organiser!';
        }
        else if (traveller.approved) {
            return 'Approved';
        }
        return "Pending...";
    };
    TripComponent.prototype.travellerStyle = function (traveller) {
        if (traveller.coorganizer) {
            return 'color: #337ab7';
        }
        else if (traveller.approved) {
            return 'color: #3c763d';
        }
        return 'color: #9B9B9B';
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], TripComponent.prototype, "container", void 0);
    TripComponent = __decorate([
        core_1.Component({
            selector: "list",
            moduleId: __filename,
            templateUrl: "./trip.html",
            styleUrls: ["./trip-common.css", "./trip.css"],
            providers: [trip_list_service_1.TripListService]
        }),
        __metadata("design:paramtypes", [trip_list_service_1.TripListService, page_1.Page, router_1.ActivatedRoute])
    ], TripComponent);
    return TripComponent;
}());
exports.TripComponent = TripComponent;
