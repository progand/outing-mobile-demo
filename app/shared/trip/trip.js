"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trip = (function () {
    function Trip(id, name, destination, description, descriptionDetails, requirements, budgetFrom, budgetTo, approvedTravellersCount, partnersReqd, coverPhoto, organiser, dateStart, dateEnd, photos, tags, travellers) {
        this.id = id;
        this.name = name;
        this.destination = destination;
        this.description = description;
        this.descriptionDetails = descriptionDetails;
        this.requirements = requirements;
        this.budgetFrom = budgetFrom;
        this.budgetTo = budgetTo;
        this.approvedTravellersCount = approvedTravellersCount;
        this.partnersReqd = partnersReqd;
        this.coverPhoto = coverPhoto;
        this.organiser = organiser;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.photos = photos;
        this.tags = tags;
        this.travellers = travellers;
    }
    return Trip;
}());
exports.Trip = Trip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUNJLGNBQW1CLEVBQVUsRUFDbEIsSUFBWSxFQUNaLFdBQTBCLEVBQzFCLFdBQW1CLEVBQ25CLGtCQUEwQixFQUMxQixZQUFvQixFQUNwQixVQUFrQixFQUNsQixRQUFnQixFQUNoQix1QkFBK0IsRUFDL0IsWUFBb0IsRUFDcEIsVUFBa0IsRUFDbEIsU0FBaUIsRUFDakIsU0FBZSxFQUNmLE9BQWEsRUFDYixNQUFxQixFQUNyQixJQUFtQixFQUNuQixVQUF5QjtRQWhCakIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNsQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFRO1FBQzFCLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQVE7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQU07UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFlO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQWU7SUFBSSxDQUFDO0lBQzdDLFdBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBbEJZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRyaXAge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZGVzdGluYXRpb246IEFycmF5PFN0cmluZz4sXG4gICAgICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogU3RyaW5nLFxuICAgICAgICBwdWJsaWMgZGVzY3JpcHRpb25EZXRhaWxzOiBTdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZXF1aXJlbWVudHM6IFN0cmluZyxcbiAgICAgICAgcHVibGljIGJ1ZGdldEZyb206IG51bWJlcixcbiAgICAgICAgcHVibGljIGJ1ZGdldFRvOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBhcHByb3ZlZFRyYXZlbGxlcnNDb3VudDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcGFydG5lcnNSZXFkOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBjb3ZlclBob3RvOiBPYmplY3QsXG4gICAgICAgIHB1YmxpYyBvcmdhbmlzZXI6IE9iamVjdCxcbiAgICAgICAgcHVibGljIGRhdGVTdGFydDogRGF0ZSxcbiAgICAgICAgcHVibGljIGRhdGVFbmQ6IERhdGUsXG4gICAgICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PE9iamVjdD4sXG4gICAgICAgIHB1YmxpYyB0YWdzOiBBcnJheTxTdHJpbmc+LFxuICAgICAgICBwdWJsaWMgdHJhdmVsbGVyczogQXJyYXk8T2JqZWN0PikgeyB9XG59Il19