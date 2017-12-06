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
        });
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "container", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            templateUrl: "pages/list/list.html",
            styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
            providers: [trip_list_service_1.TripListService]
        }),
        __metadata("design:paramtypes", [trip_list_service_1.TripListService, page_1.Page, router_1.Router])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFtRDtBQUNuRCxnQ0FBK0I7QUFFL0Isc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUV6Qyx5RUFBc0U7QUFRdEU7SUFVRSx1QkFBb0IsV0FBNEIsRUFBVSxJQUFVLEVBQVUsTUFBYztRQUF4RSxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVI1RixhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFnQixFQUFFLENBQUM7UUFDL0IsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixnQkFBVyxHQUFHLEdBQUcsR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3RELGVBQVUsR0FBRyxhQUFXLEdBQUcsR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBSyxDQUFDO1FBR2hFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7UUFDM0MsMEJBQTBCO1FBQzFCLHdFQUF3RTtJQUMxRSxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNFLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxNQUFjO1FBQXRCLGlCQWFDO1FBYk8sdUJBQUEsRUFBQSxjQUFjO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2FBQ3BCLFNBQVMsQ0FBQyxVQUFBLFdBQVc7WUFDcEIsV0FB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU2Nyb2xsRXZlbnREYXRhIH0gZnJvbSBcInVpL3Njcm9sbC12aWV3XCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRyaXAgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3RyaXAvdHJpcFwiO1xuaW1wb3J0IHsgVHJpcExpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90cmlwL3RyaXAtbGlzdC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2xpc3QvbGlzdC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbGlzdC9saXN0LWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9saXN0L2xpc3QuY3NzXCJdLFxuICBwcm92aWRlcnM6IFtUcmlwTGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgYWxsVHJpcHM6IEFycmF5PFRyaXA+ID0gW107XG4gIHZpc2libGVUcmlwczogQXJyYXk8VHJpcD4gPSBbXTtcbiAgbWF4SXRlbXMgPSA2O1xuICBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgbGlzdExvYWRlZCA9IGZhbHNlO1xuICBpbWFnZUhlaWdodCA9IDIxOSAqIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcyAvIDM1MDtcbiAgaW1hZ2VTdHlsZSA9IGBoZWlnaHQ6ICR7MjE5ICogc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzIC8gMzYwfWA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmlwU2VydmljZTogVHJpcExpc3RTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFyLnRpdGxlID0gXCJPdXRpbmdUcmF2ZWxcIjtcbiAgICAvLyBUb0RvOiByZW1vdmUgbGluZSBiZWxvd1xuICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdHJpcHMvMjM5NDg3YTEtYzQ4Mi00YjJkLWIyMjctMDRmZTZkZGU1MzlmJ10pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7ICBcbiAgICAvLyBUb0RvOiB1bmNvbW1lbnQgIFxuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcmVmcmVzaChzaWxlbnQgPSBmYWxzZSkge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnRyaXBTZXJ2aWNlLmxvYWQoKVxuICAgICAgLnN1YnNjcmliZShsb2FkZWRUcmlwcyA9PiB7XG4gICAgICAgIGxvYWRlZFRyaXBzXG4gICAgICAgIC5maWx0ZXIodHJpcE9iamVjdCA9PiB0cmlwT2JqZWN0LmNvdmVyUGhvdG8uc2l6ZXMgJiYgdHJpcE9iamVjdC5jb3ZlclBob3RvLnNpemVzLmRlZmF1bHQpXG4gICAgICAgIC5mb3JFYWNoKCh0cmlwT2JqZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy5hbGxUcmlwcy5wdXNoKHRyaXBPYmplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aXNpYmxlVHJpcHMgPSB0aGlzLmFsbFRyaXBzLnNsaWNlKDAsIHRoaXMubWF4SXRlbXMpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgICAgfSk7XG4gIH1cblxuICBzaG93TW9yZSgpe1xuICAgIHRoaXMubWF4SXRlbXMgKz0gNjtcbiAgICB0aGlzLnZpc2libGVUcmlwcyA9IHRoaXMuYWxsVHJpcHMuc2xpY2UoMCwgdGhpcy5tYXhJdGVtcyk7XG4gIH1cblxuICBvcGVuVHJpcChhcmdzKXtcbiAgICBjb25zdCB7aWR9ID0gdGhpcy52aXNpYmxlVHJpcHNbYXJncy5pbmRleF07XG4gICAgY29uc3Qgcm91dGUgPSBgL3RyaXBzLyR7aWR9YDtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVdKTtcbiAgfVxuXG4gIGdldFBob3RvKHBob3RvOiBhbnksIHNpemUgPSBcImRlZmF1bHRcIikge1xuICAgIGNvbnN0IHVybCA9IHBob3RvLnNpemVzICYmIHBob3RvLnNpemVzW3NpemVdIHx8IHBob3RvLnVybDtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgZGF0ZUludGVydmFsKHRyaXA6IGFueSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodHJpcC5kYXRlU3RhcnQpO1xuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHRyaXAuZGF0ZUVuZCk7XG4gXG4gICAgcmV0dXJuIGAke3N0YXJ0LnRvRGF0ZVN0cmluZygpfSAtICR7ZW5kLnRvRGF0ZVN0cmluZygpfWA7XG4gIH1cblxuICByZWZyZXNoTGlzdChhcmdzKSB7XG4gICAgbGV0IHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgdGhpcy50cmlwU2VydmljZS5sb2FkKClcbiAgICAgIC5zdWJzY3JpYmUobG9hZGVkVHJpcHMgPT4ge1xuICAgICAgICB0aGlzLmFsbFRyaXBzID0gW107XG4gICAgICAgIGxvYWRlZFRyaXBzLmZvckVhY2goKHRyaXBPYmplY3QpID0+IHsgICAgICAgICAgXG4gICAgICAgICAgdGhpcy5hbGxUcmlwcy5wdXNoKHRyaXBPYmplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH1cbn0iXX0=