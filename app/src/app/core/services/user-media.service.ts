import * as getUserMedia from 'getusermedia';

export class UserMediaService
{
  audioDefaultConfiguration = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    googAutoGainControl: true
  }

  videoDefaultConfiguration = {};

  getUserMedia(audio: Object | boolean, video: Object | boolean)
  {
    return new Promise((resolve, reject) => {

      let audioConfig: any = audio;
      if (typeof audio === 'object')
      {
        audioConfig = {...this.audioDefaultConfiguration, ...audio};
      }

      let videoConfig: any = video;
      if (typeof video === 'object')
      {
        videoConfig = { ...this.videoDefaultConfiguration, ...video };
      }

      getUserMedia({ audio: audioConfig, video: videoConfig }, (error, stream: MediaStream) => {

        if (error)
        {
          reject(error);
          return;
        }

        resolve(stream);

      });

    });
  }
}
