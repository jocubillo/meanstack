import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
 
@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.sass'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  // videos: Video[] = [
  //   {"_id": "1", "title": "Title 1", "url": "url 1", "description": "description 1"},
  //   {"_id": "2", "title": "Title 2", "url": "url 2", "description": "description 2"},
  //   {"_id": "3", "title": "Title 3", "url": "url 3", "description": "description 3"},
  //   {"_id": "4", "title": "Title 4", "url": "url 4", "description": "description 4"},
  //   {"_id": "5", "title": "Title 5", "url": "url 5", "description": "description 5"},
  // ];
  videos: Array<Video>;

  selectedVideo: Video;
  private hidenewVideo: boolean = true;

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
      .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video:any){
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video){
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.hidenewVideo = true;
        this.selectedVideo = resNewVideo;
      });
  }

  onUpdateVideoEvent(video: any){
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
      this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: any){
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for(let i=0; i< videoArray.length; i++){
          if(videoArray[i]._id === video._id){
            videoArray.splice(i,1);
          }
        }
      });
    this.selectedVideo = null;
  }

  newVideo(){
    this.hidenewVideo = false;
  }

  cancelNewVideo(){
    this.hidenewVideo = true;
  }

}