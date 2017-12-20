import { screen } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { action } from "ui/dialogs";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Conversation } from "../../shared/conversation/conversation"; 
import { ConversationService } from "../../shared/conversation/conversation.service";
 
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

  constructor(private conversationService: ConversationService, private page: Page, private router: Router) {
    this.page.actionBar.title = "Messages";
  }

  ngOnInit() {
    this.refresh();    
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
}