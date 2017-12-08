"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("tns-core-modules/platform");
var page_1 = require("ui/page");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var trip_list_service_1 = require("../../shared/trip/trip-list.service");
var ListComponent = (function () {
    function ListComponent(tripService, page, router) {
        this.tripService = tripService;
        this.page = page;
        this.router = router;
        this.allTrips = [];
        this.visibleTrips = [];
        this.maxItems = 6;
        this.isLoading = false;
        this.listLoaded = false;
        this.error = null;
        this.imageHeight = 219 * platform_1.screen.mainScreen.widthDIPs / 350;
        this.imageStyle = "height: " + 219 * platform_1.screen.mainScreen.widthDIPs / 360;
        this.page.actionBar.title = "OutingTravel";
        // ToDo: remove line below
        //this.router.navigate(['/trips/239487a1-c482-4b2d-b227-04fe6dde539f']);
    }
    ListComponent.prototype.ngOnInit = function () {
        // ToDo: uncomment  
        this.refresh();
    };
    ListComponent.prototype.refresh = function (silent) {
        var _this = this;
        if (silent === void 0) { silent = false; }
        this.isLoading = true;
        this.error = null;
        this.tripService.load()
            .subscribe(function (loadedTrips) {
            loadedTrips
                .filter(function (tripObject) { return tripObject.coverPhoto.sizes && tripObject.coverPhoto.sizes.default; })
                .forEach(function (tripObject) {
                _this.allTrips.push(tripObject);
            });
            _this.visibleTrips = _this.allTrips.slice(0, _this.maxItems);
            _this.isLoading = false;
            _this.listLoaded = true;
        }, function (err) {
            _this.error = err;
            _this.isLoading = false;
        });
    };
    ListComponent.prototype.showMore = function () {
        this.maxItems += 6;
        this.visibleTrips = this.allTrips.slice(0, this.maxItems);
    };
    ListComponent.prototype.openTrip = function (args) {
        var id = this.visibleTrips[args.index].id;
        var route = "/trips/" + id;
        this.router.navigate([route]);
    };
    ListComponent.prototype.getPhoto = function (photo, size) {
        if (size === void 0) { size = "default"; }
        var url = photo.sizes && photo.sizes[size] || photo.url;
        return url;
    };
    ListComponent.prototype.dateInterval = function (trip) {
        var start = new Date(trip.dateStart);
        var end = new Date(trip.dateEnd);
        return start.toDateString() + " - " + end.toDateString();
    };
    ListComponent.prototype.refreshList = function (args) {
        var _this = this;
        var pullRefresh = args.object;
        this.tripService.load()
            .subscribe(function (loadedTrips) {
            _this.allTrips = [];
            loadedTrips.forEach(function (tripObject) {
                _this.allTrips.push(tripObject);
            });
            pullRefresh.refreshing = false;
        }, function (err) {
            _this.error = err;
            _this.isLoading = false;
        });
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "container", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            moduleId: __filename,
            templateUrl: "./list.html",
            styleUrls: ["./list-common.css", "./list.css"],
            providers: [trip_list_service_1.TripListService]
        }),
        __metadata("design:paramtypes", [trip_list_service_1.TripListService, page_1.Page, router_1.Router])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
