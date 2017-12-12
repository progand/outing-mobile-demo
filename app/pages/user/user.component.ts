import { screen } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { ScrollEventData } from "ui/scroll-view";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("ImageSwipe", () => require("nativescript-image-swipe/image-swipe").ImageSwipe);
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
  selector: "user",
  moduleId: __filename,
  templateUrl: "./user.html",
  styleUrls: ["./user-common.css", "./user.css"],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  @ViewChild("container") container: ElementRef;
  userId: String;
  user: User;
  images: Array<Object>;
  maxItems = 6;
  imageHeight = 219 * screen.mainScreen.widthDIPs / 360;
  
  isLoading = false;
  isLoaded = false;
  error = null;

  constructor(private userService: UserService, private page: Page, private route: ActivatedRoute, ) {    
    this.userId = this.route.snapshot.paramMap.get('id');
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
    this.userService.loadOne(this.userId)
      .subscribe(loadedUser => {
        this.updateData(loadedUser);
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

  updateData(user: User){
    this.user = user;
    this.images = this.user.photos.map(photo => ({url: this.getPhoto(photo)}));
  }

  getPhoto(photo: any, size = "default") {
    const url = photo.sizes && photo.sizes[size] || photo.url;
    return url;
  }

  

}