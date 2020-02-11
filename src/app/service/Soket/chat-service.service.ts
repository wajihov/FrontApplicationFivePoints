import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ChatServiceService {
  constructor(private httpClient: HttpClient) {}

  header: any;
  getHeader() {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
  }

  getConversation(idUser1, idUser2) {
    this.getHeader();
    return this.httpClient.get(
      "http://localhost:8080/conversation/getOneConversation/" +
        idUser1 +
        "/" +
        idUser2,
      { headers: this.header }
    );
  }
  sendMessage(message, idUser, idConv) {
    this.getHeader();
    return this.httpClient.post(
      "http://localhost:8080/message/sendMessage/" + idUser + "/" + idConv,
      message,
      { headers: this.header }
    );
  }
}
