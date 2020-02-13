import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ChatServiceService } from "src/app/service/Soket/chat-service.service";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { WebSocketServiceService } from "src/app/service/Soket/web-socket-service.service";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
  listeUsers: any;
  listeMessages: any;
  messageForm: FormGroup;
  connectUser: any;
  chosenUser: any;
  conversation;
  stompClient: any;
  constructor(
    public chatService: ChatServiceService,
    public userService: ServProfileService,
    public service: ServiceApplicationService,
    private webSoketService: WebSocketServiceService
  ) {
    this.stompClient = webSoketService.connect();
    this.listeMessages = [];
    this.listeUsers = [];
    this.messageForm = new FormGroup({
      content: new FormControl(""),
      user: new FormControl("")
    });
    userService.getProfile(service.usernameConnected).subscribe((user: any) => {
      this.connectUser = user;
      userService.getAllProfiles().subscribe((res: any) => {
        this.listeUsers = res.filter(
          obj => obj.username !== service.usernameConnected
        );
        this.clickUser(this.listeUsers[0].id);
      });
    });
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe("/chat/sendDone", notifications => {
        this.clickUser(this.chosenUser);
      });
    });
  }

  ngOnInit() {
    this.userService
      .getProfile(this.service.usernameConnected)
      .subscribe((user: any) => {
        this.connectUser = user;
        this.messageForm = new FormGroup({
          content: new FormControl(""),
          user: new FormControl(this.connectUser.id)
        });
        this.userService.getAllProfiles().subscribe((res: any) => {
          this.listeUsers = res.filter(
            obj => obj.username !== this.service.usernameConnected
          );
          this.clickUser(this.listeUsers[0].id);
        });
      });
  }
  clickUser(idUser) {
    this.chosenUser = idUser;
    this.chatService
      .getConversation(idUser, this.connectUser.id)
      .subscribe((res: any) => {
        this.conversation = res.id;
        this.listeMessages = res.messages;
      });
  }
  sendMessage() {
    this.chatService
      .sendMessage(
        this.messageForm.value.content,
        this.messageForm.value.user,
        this.conversation
      )
      .subscribe((res: any) => {
        console.log("le res => ", res);
      });
    this.messageForm = new FormGroup({
      content: new FormControl(""),
      user: new FormControl(this.connectUser.id)
    });
  }
}
