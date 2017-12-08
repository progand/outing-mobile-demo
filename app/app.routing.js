"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_component_1 = require("./pages/list/list.component");
var trip_component_1 = require("./pages/trip/trip.component");
exports.routes = [
    { path: "", component: list_component_1.ListComponent },
    { path: "trips/:id", component: trip_component_1.TripComponent }
];
exports.navigatableComponents = [
    list_component_1.ListComponent,
    trip_component_1.TripComponent
];
