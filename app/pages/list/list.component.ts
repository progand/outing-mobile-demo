import { screen } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { ScrollEventData } from "ui/scroll-view";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Trip } from "../../shared/trip/trip";
import { TripService } from "../../shared/trip/trip.service";

@Component({
  selector: "list",
  moduleId: __filename,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"],
  providers: [TripService]
})
export class ListComponent implements OnInit {
  @ViewChild("container") container: ElementRef;
  allTrips: Array<Trip> = [];
  visibleTrips: Array<Trip> = [];
  maxItems = 6;
  isLoading = false;
  listLoaded = false;
  error = null;
  imageHeight = 219 * screen.mainScreen.widthDIPs / 350;
  imageStyle = `height: ${219 * screen.mainScreen.widthDIPs / 360}`;

  constructor(private tripService: TripService, private page: Page, private router: Router) {
    this.page.actionBar.title = "OutingTravel";
    // ToDo: remove line below
    //this.router.navigate(['/users/local-1e22817080e04b49f44742d0588654f6b383c97e137c1f55110860547a9c90ab']);
  }

  ngOnInit() {
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
          .sort(this.sortTrips.bind(this))
          .forEach((tripObject) => {
            this.allTrips.push(tripObject);
          });
        this.visibleTrips = this.allTrips.slice(0, this.maxItems);
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

  showMore() {
    this.maxItems += 6;
    this.visibleTrips = this.allTrips.slice(0, this.maxItems);
  }

  openTrip(args) {
    const { id } = this.visibleTrips[args.index];
    const route = `/trips/${id}`;
    this.router.navigate([route]);
  }
  openUser(userId) {
    const route = `/users/${userId}`;
    this.router.navigate([route]);
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

  sortTrips(trip1, trip2){ 
    const total1 = this.getTripTotal(trip1);
    const total2 = this.getTripTotal(trip2);
    if(total1 !== total2){
      return total2 - total1;
    }
    return 0;
  }

  getTripTotal(trip){
    const photos = (trip.photos || []).length;
    const travellers = (trip.travellers || []).length;
    const schedules = (trip.schedule || []).length;

    return photos + schedules + travellers/3;
  }
}