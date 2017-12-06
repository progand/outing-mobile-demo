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
        this.tripId = this.route.snapshot.paramMap.get('id');
    }
    TripComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    TripComponent.prototype.refresh = function () {
        var _this = this;
        this.isLoading = true;
        this.tripService.loadOne(this.tripId)
            .subscribe(function (loadedTrip) {
            _this.updateData(loadedTrip);
            _this.isLoading = false;
            _this.isLoaded = true;
        });
    };
    TripComponent.prototype.refreshTrip = function (args) {
        var _this = this;
        var pullRefresh = args.object;
        this.tripService.loadOne(this.tripId)
            .subscribe(function (loadedTrip) {
            _this.updateData(loadedTrip);
            pullRefresh.refreshing = false;
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
            templateUrl: "pages/trip/trip.html",
            styleUrls: ["pages/trip/trip-common.css", "pages/trip/trip.css"],
            providers: [trip_list_service_1.TripListService]
        }),
        __metadata("design:paramtypes", [trip_list_service_1.TripListService, page_1.Page, router_1.ActivatedRoute])
    ], TripComponent);
    return TripComponent;
}());
exports.TripComponent = TripComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFtRDtBQUNuRCxnQ0FBK0I7QUFFL0Isc0NBQXlFO0FBQ3pFLDBDQUFpRDtBQUNqRCwwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLFVBQVUsRUFBMUQsQ0FBMEQsQ0FBQyxDQUFDO0FBRWhHLHlFQUFzRTtBQVF0RTtJQVdFLHVCQUFvQixXQUE0QixFQUFVLElBQVUsRUFBVSxLQUFxQjtRQUEvRSxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFObkcsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGdCQUFXLEdBQUcsR0FBRyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFFdEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCwrQkFBTyxHQUFQO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2xDLFNBQVMsQ0FBQyxVQUFBLFVBQVU7WUFDbkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QixL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QVMsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxQixDQUFDO1FBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFsRnVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO29EQUFDO0lBRG5DLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLEVBQUUscUJBQXFCLENBQUM7WUFDaEUsU0FBUyxFQUFFLENBQUMsbUNBQWUsQ0FBQztTQUM3QixDQUFDO3lDQVlpQyxtQ0FBZSxFQUFnQixXQUFJLEVBQWlCLHVCQUFjO09BWHhGLGFBQWEsQ0FvRnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXBGRCxJQW9GQztBQXBGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiSW1hZ2VTd2lwZVwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWltYWdlLXN3aXBlL2ltYWdlLXN3aXBlXCIpLkltYWdlU3dpcGUpO1xuaW1wb3J0IHsgVHJpcCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHJpcC90cmlwXCI7XG5pbXBvcnQgeyBUcmlwTGlzdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3RyaXAvdHJpcC1saXN0LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvdHJpcC90cmlwLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy90cmlwL3RyaXAtY29tbW9uLmNzc1wiLCBcInBhZ2VzL3RyaXAvdHJpcC5jc3NcIl0sXG4gIHByb3ZpZGVyczogW1RyaXBMaXN0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVHJpcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICB0cmlwSWQ6IFN0cmluZztcbiAgdHJpcDogVHJpcDtcbiAgaW1hZ2VzOiBBcnJheTxPYmplY3Q+O1xuICBtYXhJdGVtcyA9IDY7XG4gIGltYWdlSGVpZ2h0ID0gMjE5ICogc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzIC8gMzYwO1xuICBcbiAgaXNMb2FkaW5nID0gZmFsc2U7XG4gIGlzTG9hZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmlwU2VydmljZTogVHJpcExpc3RTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCApIHsgICAgXG4gICAgdGhpcy50cmlwSWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgnaWQnKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy50cmlwU2VydmljZS5sb2FkT25lKHRoaXMudHJpcElkKVxuICAgICAgLnN1YnNjcmliZShsb2FkZWRUcmlwID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKGxvYWRlZFRyaXApO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVmcmVzaFRyaXAoYXJncykge1xuICAgIGxldCBwdWxsUmVmcmVzaCA9IGFyZ3Mub2JqZWN0O1xuICAgIHRoaXMudHJpcFNlcnZpY2UubG9hZE9uZSh0aGlzLnRyaXBJZClcbiAgICAgIC5zdWJzY3JpYmUobG9hZGVkVHJpcCA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0YShsb2FkZWRUcmlwKTtcbiAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH1cblxuICB1cGRhdGVEYXRhKHRyaXA6IFRyaXApe1xuICAgIHRoaXMudHJpcCA9IHRyaXA7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhci50aXRsZSA9IHRoaXMudHJpcC5uYW1lO1xuICAgIHRoaXMuaW1hZ2VzID0gdGhpcy50cmlwLnBob3Rvcy5tYXAocGhvdG8gPT4gKHt1cmw6IHRoaXMuZ2V0UGhvdG8ocGhvdG8pfSkpO1xuICB9XG5cbiAgZ2V0UGhvdG8ocGhvdG86IGFueSwgc2l6ZSA9IFwiZGVmYXVsdFwiKSB7XG4gICAgY29uc3QgdXJsID0gcGhvdG8uc2l6ZXMgJiYgcGhvdG8uc2l6ZXNbc2l6ZV0gfHwgcGhvdG8udXJsO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBkYXRlSW50ZXJ2YWwodHJpcDogVHJpcCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodHJpcC5kYXRlU3RhcnQpO1xuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHRyaXAuZGF0ZUVuZCk7XG5cbiAgICByZXR1cm4gYCR7c3RhcnQudG9EYXRlU3RyaW5nKCl9IC0gJHtlbmQudG9EYXRlU3RyaW5nKCl9YDtcbiAgfVxuXG4gIHBhcnRuZXJzQ291bnQodHJpcDogVHJpcCl7XG4gICAgcmV0dXJuIGAke3RyaXAuYXBwcm92ZWRUcmF2ZWxsZXJzQ291bnR9LyR7dHJpcC5wYXJ0bmVyc1JlcWR9IEFkdmVudHVyZXJzYFxuICB9XG5cbiAgdGFncyh0cmlwOiBUcmlwKXtcbiAgICByZXR1cm4gdHJpcC50YWdzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGJ1ZGdldCh0cmlwOiBUcmlwKXtcbiAgICByZXR1cm4gYMKlJHt0cmlwLmJ1ZGdldEZyb219IC0gJHt0cmlwLmJ1ZGdldFRvfWBcbiAgfVxuXG4gIHRyYXZlbGxlckluZm8odHJhdmVsbGVyOiBhbnkpe1xuICAgIGlmKHRyYXZlbGxlci5jb29yZ2FuaXplcil7XG4gICAgICByZXR1cm4gJ09yZ2FuaXNlciEnO1xuICAgIH0gZWxzZSBpZiAodHJhdmVsbGVyLmFwcHJvdmVkKXtcbiAgICAgIHJldHVybiAnQXBwcm92ZWQnO1xuICAgIH1cbiAgICByZXR1cm4gXCJQZW5kaW5nLi4uXCI7XG4gIH1cbiAgdHJhdmVsbGVyU3R5bGUodHJhdmVsbGVyOiBhbnkpe1xuICAgIGlmKHRyYXZlbGxlci5jb29yZ2FuaXplcil7XG4gICAgICByZXR1cm4gJ2NvbG9yOiAjMzM3YWI3JztcbiAgICB9IGVsc2UgaWYgKHRyYXZlbGxlci5hcHByb3ZlZCl7XG4gICAgICByZXR1cm4gJ2NvbG9yOiAjM2M3NjNkJztcbiAgICB9IFxuICAgIHJldHVybiAnY29sb3I6ICM5QjlCOUInO1xuICB9XG59Il19