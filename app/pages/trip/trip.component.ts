import { screen } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { ScrollEventData } from "ui/scroll-view";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("ImageSwipe", () => require("nativescript-image-swipe/image-swipe").ImageSwipe);
import { Trip } from "../../shared/trip/trip";
import { TripListService } from "../../shared/trip/trip-list.service";

@Component({
  selector: "trip",
  moduleId: __filename,
  templateUrl: "./trip.html",
  styleUrls: ["./trip-common.css", "./trip.css"],
  providers: [TripListService]
})
export class TripComponent implements OnInit {
  @ViewChild("container") container: ElementRef;
  tripId: String;
  trip: Trip;
  images: Array<Object>;
  maxItems = 6;
  imageHeight = 219 * screen.mainScreen.widthDIPs / 360;
  
  isLoading = false;
  isLoaded = false;
  error = null;

  constructor(private tripService: TripListService, private page: Page, private route: ActivatedRoute, ) {    
    this.tripId = this.route.snapshot.paramMap.get('id');
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(args = null) {
    let pullRefresh = args && args.object;
    if (!pullRefresh) {
      this.isLoading = true;
    }    
    this.tripService.loadOne(this.tripId)
      .subscribe(loadedTrip => {
        this.updateData(loadedTrip);
        this.isLoading = false;
        this.isLoaded = true;
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

  updateData(trip: Trip){
    this.trip = trip;
    this.images = this.trip.photos.map(photo => ({url: this.getPhoto(photo)}));
  }

  getPhoto(photo: any, size = "default") {
    const url = photo.sizes && photo.sizes[size] || photo.url;
    return url;
  }

  dateInterval(trip: Trip) {
    const start = new Date(trip.dateStart);
    const end = new Date(trip.dateEnd);

    return `${start.toDateString()} - ${end.toDateString()}`;
  }

  partnersCount(trip: Trip){
    return `${trip.approvedTravellersCount}/${trip.partnersReqd} Adventurers`
  }

  tags(trip: Trip){
    return trip.tags.join(' ');
  }

  budget(trip: Trip){
    return `¥${trip.budgetFrom} - ${trip.budgetTo}`
  }

  organiserInfo(organiser: any = {}){
    let info = '';
    if(organiser.uni){
      info += organiser.uni + ' | ';
    }
    const since = new Date(organiser.since);
    info += 'Started ' + since.toDateString();
    return info;
  }

  travellerInfo(traveller: any){
    if(traveller.coorganizer){
      return 'Organiser!';
    } else if (traveller.approved){
      return 'Approved';
    }
    return "Pending...";
  }
  travellerStyle(traveller: any){
    if(traveller.coorganizer){
      return 'color: #337ab7';
    } else if (traveller.approved){
      return 'color: #3c763d';
    } 
    return 'color: #9B9B9B';
  }
}