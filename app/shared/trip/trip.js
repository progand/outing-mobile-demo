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
