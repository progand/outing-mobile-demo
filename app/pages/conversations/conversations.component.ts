import { screen } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { action } from "ui/dialogs";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Conversation } from "../../shared/conversation/conversation";
import { ConversationService } from "../../shared/conversation/conversation.service";
import { AuthService } from "../../shared/auth/auth.service";
import {getPhoto} from "../../shared/util/photo";

@Component({
  selector: "conversations",
  moduleId: __filename,
  templateUrl: "./conversations.html",
  styleUrls: ["./conversations-common.css", "./conversations.css"],
  providers: [ConversationService]
})
export class ConversationsComponent implements OnInit {
  conversations: Array<Conversation> = [];
  isLoading = false;
  isLoaded = false;
  error = null;
  imageHeight = 219 * screen.mainScreen.widthDIPs / 350;
  imageStyle = `height: ${219 * screen.mainScreen.widthDIPs / 360}`;

  constructor(private authService: AuthService, private conversationService: ConversationService, private page: Page, private router: Router) {
    this.page.actionBar.title = "Messages";
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.refresh();
    }
  }

  refresh(args = null) {
    let pullRefresh = args && args.object;
    if (!pullRefresh) {
      this.isLoading = true;
    }
    this.conversationService.load()
      .subscribe(loadedConversations => {
        this.conversations = [];
        loadedConversations
          .forEach((conversationObject) => {
            this.conversations.push(conversationObject);
          });
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

  openConversation(args) {
    const { id } = this.conversations[args.index];
    const route = `/conversations/${id}`;
    this.router.navigate([route]);
  }

  getLastMessage(conversation){
    return conversation.messages.length ? conversation.messages[0].text : '';
  }

  getTitle(conversation){
    // group conversation
    if(!conversation.isIndividual && conversation.trip){
      return conversation.trip.name;
    } 
    
    // individual conversation
    if(conversation.participants && conversation.participants.length){
      const me = this.authService.getProfile();
      const otherParticipant = conversation.participants.find(user => user.id !== me.id);
      return otherParticipant && otherParticipant.name;
    }
  }

  getConversationPhoto(conversation){
    // group conversation
    if(!conversation.isIndividual && conversation.trip){
      return getPhoto(conversation.trip.coverPhoto);
    } 

    // individual conversation
    if(conversation.participants && conversation.participants.length){
      const me = this.authService.getProfile();
      const otherParticipant = conversation.participants.find(user => user.id !== me.id);
      return getPhoto(otherParticipant.photo);
    }
  }  

  hasSomeConversations(){ 
    return !!this.conversations && this.conversations.length > 0;
  }
}