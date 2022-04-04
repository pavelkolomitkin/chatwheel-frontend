import {AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserMediaService} from "../../../core/services/user-media.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterContentInit, OnDestroy {


  @ViewChild('videoElement') videoElement: ElementRef;

  userMedia: MediaStream = null;

  isRequestingMedia: boolean = false;
  initializationError: boolean = false;

  constructor(
    private mediaService: UserMediaService
  ) { }

  async ngOnInit() {


  }

  async initUserMedia()
  {

    this.isRequestingMedia = true;
    try {
      // @ts-ignore
      this.userMedia = await this.mediaService.getUserMedia(true, true);
      this.videoElement.nativeElement.srcObject = this.userMedia;
    }
    catch (error)
    {
      this.initializationError = true;
    }

    this.isRequestingMedia = false;

  }

  async ngAfterContentInit() {
    await this.initUserMedia();
  }

  ngOnDestroy(): void {
    if (this.userMedia)
    {
      this.userMedia.getTracks().map(track => track.stop());
    }
  }

}
