import { Component, OnInit, Renderer2 } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { ServiceImageService } from "src/app/service/image/service-image.service";
import { MatDialog } from "@angular/material/dialog";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
//import Swal from "sweetalert2/dist/sweetalert2.js";
import Swal from "sweetalert2";
//import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userFile: any = File;
  ImageProfile: any = File;
  userData: any;
  listNameImages: any;
  listAmis: any = [];
  closeResult: string;

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService,
    private render: Renderer2,
    private serviceImage: ServiceImageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.serviceProfile.getProfile(this.service.usernameConnected).subscribe(
      data => {
        this.userData = data;
        this.listNameImages = this.userData.images;
        this.serviceProfile
          .getListAmis(this.userData.id)
          .subscribe(response => {
            this.listAmis = response;
            console.log("amis ", this.listAmis);
          });
      },
      err => {
        console.log("Error display image : ", err);
      }
    );
    //
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    console.log("image [@]: ", file);
    this.userFile = file;
    const formData = new FormData();
    formData.append("file", this.userFile, this.userFile.name);
    console.log(formData.get("file"));

    this.serviceProfile.saveImage(formData).subscribe(data => {
      console.log("data : image ", data);
      this.ngOnInit();
    });
    // this.refresh();
  }

  onSelectFileImgProfile(event2: any) {
    const fileProfile = event2.target.files[0];
    this.ImageProfile = fileProfile;
    console.log("test file", fileProfile);
    const formData = new FormData();
    formData.append("file", this.ImageProfile, this.ImageProfile.name);
    console.log(formData.get("file"));

    this.serviceProfile
      .saveImageProfile(formData, this.userData.id)
      .subscribe(data => {
        console.log("le nom est : ", data);
        this.refresh();
        // renderer2 angular
      });
  }
  refresh(): void {
    window.location.reload();
  }

  deleteTest() {
    Swal.fire("The Internet?", "That thing is still around?", "question");
  }
  deleteImage(idImage: number) {
    Swal.fire({
      /* title: "Delete Image",
      text: "Are you sure to delete this image ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it" */
      title: "Delete Image",
      text: "Are you sure to delete this image ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );
        this.serviceImage.deleteImage(idImage).subscribe(data => {
          console.log("les data est : ", data);
          this.ngOnInit();
        });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }
}
