import { screen } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { ScrollEventData } from "ui/scroll-view";
import { action } from "ui/dialogs";
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';

import { Trip } from "../../shared/trip/trip";
import { TripService } from "../../shared/trip/trip.service";
import { AuthService } from "../../shared/auth/auth.service";

const SORT_BY_RECOMMENDED = "Recommended", SORT_BY_DATE = "Date", SORT_BY_AVAILABILITY = "Availability";

@Component({
  selector: "list",
  moduleId: __filename,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"],
  providers: [TripService, AuthService]
})
export class ListComponent implements AfterViewInit, OnInit {
  @ViewChild("container") container: ElementRef;
  allTrips: Array<Trip> = [];
  visibleTrips: Array<Trip> = [];
  maxItems = 6;
  isLoading = false;
  listLoaded = false;
  error = null;
  imageHeight = 219 * screen.mainScreen.widthDIPs / 350;
  imageStyle = `height: ${219 * screen.mainScreen.widthDIPs / 360}`;
  sortBy = SORT_BY_RECOMMENDED;
  isAuthenticated = false;

  constructor(private authService: AuthService, private tripService: TripService, private page: Page, private router: Router) {
    this.page.actionBar.title = "OutingTravel";
    // ToDo: remove line below
    //this.router.navigate(['/login']);
  }

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  ngOnInit() {
    this.updateAutenticationStatus();
    // ToDo: uncomment  
    this.refresh();
    
  }

  refresh(args = null) {
    let pullRefresh = args && args.object;
    if (!pullRefresh) {
      this.isLoading = true;
    }
    this.tripService.load()
      .subscribe(loadedTrips => {
        loadedTrips
          .forEach((tripObject) => {
            this.allTrips.push(tripObject);
          });
        this.render();
        this.isLoading = false;
        this.listLoaded = true;
        this.error = null;
        if (pullRefresh) {
          pullRefresh.refreshing = false;
        }
      }, err => {
        this.error = err;
        this.isLoading = false;
        if (pullRefresh) {
          pullRefresh.refreshing = false;
        }
      });
  }

  render() {
    this.allTrips = this.allTrips.sort(this.sortTrips.bind(this));
    this.visibleTrips = this.allTrips.slice(0, this.maxItems);
  }

  sortTrips(trip1, trip2) {
    if (this.sortBy === SORT_BY_RECOMMENDED) {
      const total1 = this.getTripRecommendedTotal(trip1);
      const total2 = this.getTripRecommendedTotal(trip2);
      if (total1 !== total2) {
        return total2 - total1;
      }
      return 0;
    } else if (this.sortBy === SORT_BY_DATE) {
      if (trip1.dateStart > trip2.dateStart || trip1.dateEnd > trip2.dateEnd) return -1;
      if (trip1.dateStart < trip2.dateStart || trip1.dateEnd < trip2.dateEnd) return 1;
      return 0;
    } else if (this.sortBy === SORT_BY_AVAILABILITY) {
      const total1 = trip1.partnersReqd - trip1.approvedTravellersCount;
      const total2 = trip2.partnersReqd - trip2.approvedTravellersCount;
      if (total1 !== total2) {
        return total2 - total1;
      }
      return 0;
    }
  }

  displaySortingDialog() {
    // >> action-dialog-code
    let options = {
      title: "Sort by",
      message: "Choose the sorting way",
      cancelButtonText: "Cancel",
      actions: [SORT_BY_RECOMMENDED, SORT_BY_DATE, SORT_BY_AVAILABILITY]
    };

    action(options).then((result) => {
      this.sortBy = result;
      this.render();
    });
  }

  showMore() {
    const start = this.visibleTrips.length;
    const end = start + this.maxItems;
    const moreTrips = this.allTrips.slice(start, end);
    Array.prototype.push.apply(this.visibleTrips, moreTrips);
  }

  openTrip(args) {
    const { id } = this.visibleTrips[args.index];
    const route = `/trips/${id}`;
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.updateAutenticationStatus();
  }

  updateAutenticationStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  getPhoto(photo: any, size = "default") {
    const url = photo.sizes && photo.sizes[size] || photo.url;
    return url;
  }

  dateInterval(trip: any) {
    const start = new Date(trip.dateStart);
    const end = new Date(trip.dateEnd);

    return `${start.toDateString()} - ${end.toDateString()}`;
  }

  getTripRecommendedTotal(trip) {
    const photos = (trip.photos || []).length;
    const travellers = (trip.travellers || []).length;
    const schedules = (trip.schedule || []).length;

    return photos + schedules + travellers / 3;
  }

  public onToggleDrawerTap() {
    this.drawer.toggleDrawerState();
  }
}