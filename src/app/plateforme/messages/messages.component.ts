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
      /*  userService.getAllProfiles().subscribe((res: any) => {
        this.listeA = res.filter(
          obj => obj.username !== service.usernameConnected
        );
        this.clickUser(this.listeUsers[0].id);
      }); */
    });

    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe("/chat/sendDone", notifications => {
        this.clickUser(this.chosenUser);
      });
    });
  }

  ngOnInit() {
    console.log("connected : ", this.service.usernameConnected);
    this.userService.getProfile(this.service.usernameConnected).subscribe(
      (user: any) => {
        this.connectUser = user;
        this.messageForm = new FormGroup({
          content: new FormControl(""),
          user: new FormControl(this.connectUser.id)
        });
        this.listNameImages = this.connectUser.images;
        this.userService
          .getListAmis(this.connectUser.id)
          .subscribe(response => {
            this.listAmis = response;
            console.log(this.listAmis.name);
          });
        this.clickUser(this.listAmis[0].id);
      },
      err => {
        console.log("Error display image : ", err);
      }
    );
  }

  clickUser(idUser) {
    this.chosenUserId = idUser;
    this.userService.getUser(this.chosenUserId).subscribe(data => {
      this.chosenUser = data;
    });
    this.chatService
      .getConversation(idUser, this.connectUser.id)
      .subscribe((res: any) => {
        this.conversation = res.id;
        this.listeMessages = res.messages;
        console.log(this.listeMessages);
      });
  }

  sendMessage() {
    console.log("le content : ", this.messageForm.value.content);
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
