import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ChatServiceService } from "src/app/service/Soket/chat-service.service";
import { WebSocketServiceService } from "src/app/service/Soket/web-socket-service.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  connectUser: any;
  listAmis: any = [];
  listNameImages: any;
  url = "http://localhost:8080/api/image/getPhoto";
  chosenUserId: any;
  chosenUser: any;
  listeMessages: any;
  messageForm: FormGroup;
  conversation;
  stompClient: any;

  constructor(
    public userService: ServProfileService,
    public chatService: ChatServiceService,
    public service: ServiceApplicationService,
    private webSoketService: WebSocketServiceService
  ) {
    this.stompClient = webSoketService.connect();
    this.listeMessages = [];
    this.listAmis = [];
    this.messageForm = new FormGroup({
      content: new FormControl(""),
      user: new FormControl("")
    });
    userService.getProfile(service.usernameConnected).subscribe((user: any) => {
      this.connectUser = user;
      //si qlq probleme par ici
      userService.getListAmis(this.connectUser.id).subscribe((res: any) => {
        this.listAmis = res;
        this.clickUser(this.listAmis[0].id);
      });
    });

    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe("/chat/sendDone", notifications => {
        this.clickUser(this.chosenUser.id);
      });
    });
  }

  ngOnInit() {
    this.userService.getProfile(this.service.usernameConnected).subscribe(
      (user: any) => {
        this.connectUser = user;
        console.log("l'utilisateur : ", this.connectUser.id);

        this.messageForm = new FormGroup({
          content: new FormControl(""),
          user: new FormControl(this.connectUser.id)
        });
        this.listNameImages = this.connectUser.images;
        this.userService
          .getListAmis(this.connectUser.id)
          .subscribe(response => {
            this.listAmis = response;
            this.clickUser(this.listAmis[0].id);
          });
      },
      err => {
        console.log("Error display image : ", err);
      }
    );
  }

  clickUser(idUser) {
    this.chosenUserId = idUser;
    console.log("le click ", this.chosenUserId);

    this.userService.getUser(this.chosenUserId).subscribe(data => {
      this.chosenUser = data;
    });
    this.chatService
      .getConversation(idUser, this.connectUser.id)
      .subscribe((res: any) => {
        this.conversation = res.id;
        this.listeMessages = res.messages;
      });
  }

  sendMessage() {
    console.log("user : ", this.connectUser.id);
    console.log("distination : ", this.chosenUserId);

    this.chatService
      .sendMessage(
        this.messageForm.value.content,
        this.messageForm.value.user,
        this.conversation
      )
      .subscribe((res: any) => {});
    this.messageForm = new FormGroup({
      content: new FormControl(""),
      user: new FormControl(this.connectUser.id)
    });
  }
}
