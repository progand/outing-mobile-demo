import { ListComponent } from "./pages/list/list.component";
import { TripComponent } from "./pages/trip/trip.component";

export const routes = [
  { path: "", component: ListComponent },
  { path: "trips/:id", component: TripComponent }
];

export const navigatableComponents = [
  ListComponent,
  TripComponent
];