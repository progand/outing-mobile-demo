import { ListComponent } from "./pages/list/list.component";
import { TripComponent } from "./pages/trip/trip.component";
import { UserComponent } from "./pages/user/user.component";

export const routes = [
  { path: "", component: ListComponent },
  { path: "trips/:id", component: TripComponent },
  { path: "users/:id", component: UserComponent }
];

export const navigatableComponents = [
  ListComponent,
  TripComponent,
  UserComponent
];