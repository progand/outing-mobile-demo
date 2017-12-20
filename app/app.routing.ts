import { ListComponent } from "./pages/list/list.component";
import { TripComponent } from "./pages/trip/trip.component";
import { UserComponent } from "./pages/user/user.component";
import { LoginComponent } from "./pages/login/login.component";
import { ConversationsComponent } from "./pages/conversations/conversations.component";

export const routes = [
  { path: "", component: ListComponent },
  { path: "trips/:id", component: TripComponent },
  { path: "users/:id", component: UserComponent },
  { path: "login", component: LoginComponent },
  { path: "conversations", component: ConversationsComponent }
];

export const navigatableComponents = [
  ListComponent,
  TripComponent,
  UserComponent,
  LoginComponent,
  ConversationsComponent
];