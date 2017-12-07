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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFtRDtBQUNuRCxnQ0FBK0I7QUFFL0Isc0NBQXlFO0FBQ3pFLDBDQUFpRDtBQUNqRCwwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLFVBQVUsRUFBMUQsQ0FBMEQsQ0FBQyxDQUFDO0FBRWhHLHlFQUFzRTtBQVN0RTtJQVlFLHVCQUFvQixXQUE0QixFQUFVLElBQVUsRUFBVSxLQUFxQjtRQUEvRSxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFQbkcsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGdCQUFXLEdBQUcsR0FBRyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFFdEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFHWCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFBQSxpQkFZQztRQVhDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbEMsU0FBUyxDQUFDLFVBQUEsVUFBVTtZQUNuQixLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDSixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUFoQixpQkFVQztRQVRDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNsQyxTQUFTLENBQUMsVUFBQSxVQUFVO1lBQ25CLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUIsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQyxFQUFFLFVBQUEsR0FBRztZQUNKLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxJQUFVO1FBQXJCLGlCQUlDO1FBSEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsS0FBVSxFQUFFLElBQWdCO1FBQWhCLHFCQUFBLEVBQUEsZ0JBQWdCO1FBQ25DLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsb0NBQVksR0FBWixVQUFhLElBQVU7UUFDckIsSUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuQyxNQUFNLENBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxXQUFNLEdBQUcsQ0FBQyxZQUFZLEVBQUksQ0FBQztJQUMzRCxDQUFDO0lBRUQscUNBQWEsR0FBYixVQUFjLElBQVU7UUFDdEIsTUFBTSxDQUFJLElBQUksQ0FBQyx1QkFBdUIsU0FBSSxJQUFJLENBQUMsWUFBWSxpQkFBYyxDQUFBO0lBQzNFLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssSUFBVTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLElBQVU7UUFDZixNQUFNLENBQUMsV0FBSSxJQUFJLENBQUMsVUFBVSxXQUFNLElBQUksQ0FBQyxRQUFVLENBQUE7SUFDakQsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBYyxTQUFjO1FBQzFCLEVBQUUsQ0FBQSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztZQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxzQ0FBYyxHQUFkLFVBQWUsU0FBYztRQUMzQixFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQztZQUN4QixNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztZQUM3QixNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDMUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBMUZ1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTtvREFBQztJQURuQyxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsbUNBQWUsQ0FBQztTQUM3QixDQUFDO3lDQWFpQyxtQ0FBZSxFQUFnQixXQUFJLEVBQWlCLHVCQUFjO09BWnhGLGFBQWEsQ0E0RnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTVGRCxJQTRGQztBQTVGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiSW1hZ2VTd2lwZVwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWltYWdlLXN3aXBlL2ltYWdlLXN3aXBlXCIpLkltYWdlU3dpcGUpO1xuaW1wb3J0IHsgVHJpcCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHJpcC90cmlwXCI7XG5pbXBvcnQgeyBUcmlwTGlzdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3RyaXAvdHJpcC1saXN0LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpc3RcIixcbiAgbW9kdWxlSWQ6IF9fZmlsZW5hbWUsXG4gIHRlbXBsYXRlVXJsOiBcIi4vdHJpcC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi90cmlwLWNvbW1vbi5jc3NcIiwgXCIuL3RyaXAuY3NzXCJdLFxuICBwcm92aWRlcnM6IFtUcmlwTGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRyaXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgdHJpcElkOiBTdHJpbmc7XG4gIHRyaXA6IFRyaXA7XG4gIGltYWdlczogQXJyYXk8T2JqZWN0PjtcbiAgbWF4SXRlbXMgPSA2O1xuICBpbWFnZUhlaWdodCA9IDIxOSAqIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcyAvIDM2MDtcbiAgXG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuICBpc0xvYWRlZCA9IGZhbHNlO1xuICBlcnJvciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmlwU2VydmljZTogVHJpcExpc3RTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCApIHsgICAgXG4gICAgdGhpcy50cmlwSWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgnaWQnKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgdGhpcy50cmlwU2VydmljZS5sb2FkT25lKHRoaXMudHJpcElkKVxuICAgICAgLnN1YnNjcmliZShsb2FkZWRUcmlwID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKGxvYWRlZFRyaXApO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnI7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlZnJlc2hUcmlwKGFyZ3MpIHtcbiAgICBsZXQgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcbiAgICB0aGlzLnRyaXBTZXJ2aWNlLmxvYWRPbmUodGhpcy50cmlwSWQpXG4gICAgICAuc3Vic2NyaWJlKGxvYWRlZFRyaXAgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGEobG9hZGVkVHJpcCk7XG4gICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnI7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURhdGEodHJpcDogVHJpcCl7XG4gICAgdGhpcy50cmlwID0gdHJpcDtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFyLnRpdGxlID0gdGhpcy50cmlwLm5hbWU7XG4gICAgdGhpcy5pbWFnZXMgPSB0aGlzLnRyaXAucGhvdG9zLm1hcChwaG90byA9PiAoe3VybDogdGhpcy5nZXRQaG90byhwaG90byl9KSk7XG4gIH1cblxuICBnZXRQaG90byhwaG90bzogYW55LCBzaXplID0gXCJkZWZhdWx0XCIpIHtcbiAgICBjb25zdCB1cmwgPSBwaG90by5zaXplcyAmJiBwaG90by5zaXplc1tzaXplXSB8fCBwaG90by51cmw7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGRhdGVJbnRlcnZhbCh0cmlwOiBUcmlwKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0cmlwLmRhdGVTdGFydCk7XG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUodHJpcC5kYXRlRW5kKTtcblxuICAgIHJldHVybiBgJHtzdGFydC50b0RhdGVTdHJpbmcoKX0gLSAke2VuZC50b0RhdGVTdHJpbmcoKX1gO1xuICB9XG5cbiAgcGFydG5lcnNDb3VudCh0cmlwOiBUcmlwKXtcbiAgICByZXR1cm4gYCR7dHJpcC5hcHByb3ZlZFRyYXZlbGxlcnNDb3VudH0vJHt0cmlwLnBhcnRuZXJzUmVxZH0gQWR2ZW50dXJlcnNgXG4gIH1cblxuICB0YWdzKHRyaXA6IFRyaXApe1xuICAgIHJldHVybiB0cmlwLnRhZ3Muam9pbignICcpO1xuICB9XG5cbiAgYnVkZ2V0KHRyaXA6IFRyaXApe1xuICAgIHJldHVybiBgwqUke3RyaXAuYnVkZ2V0RnJvbX0gLSAke3RyaXAuYnVkZ2V0VG99YFxuICB9XG5cbiAgdHJhdmVsbGVySW5mbyh0cmF2ZWxsZXI6IGFueSl7XG4gICAgaWYodHJhdmVsbGVyLmNvb3JnYW5pemVyKXtcbiAgICAgIHJldHVybiAnT3JnYW5pc2VyISc7XG4gICAgfSBlbHNlIGlmICh0cmF2ZWxsZXIuYXBwcm92ZWQpe1xuICAgICAgcmV0dXJuICdBcHByb3ZlZCc7XG4gICAgfVxuICAgIHJldHVybiBcIlBlbmRpbmcuLi5cIjtcbiAgfVxuICB0cmF2ZWxsZXJTdHlsZSh0cmF2ZWxsZXI6IGFueSl7XG4gICAgaWYodHJhdmVsbGVyLmNvb3JnYW5pemVyKXtcbiAgICAgIHJldHVybiAnY29sb3I6ICMzMzdhYjcnO1xuICAgIH0gZWxzZSBpZiAodHJhdmVsbGVyLmFwcHJvdmVkKXtcbiAgICAgIHJldHVybiAnY29sb3I6ICMzYzc2M2QnO1xuICAgIH0gXG4gICAgcmV0dXJuICdjb2xvcjogIzlCOUI5Qic7XG4gIH1cbn0iXX0=