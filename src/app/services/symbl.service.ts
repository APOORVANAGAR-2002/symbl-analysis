import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Symbl } from '@symblai/symbl-web-sdk';

@Injectable({
  providedIn: 'root',
})
export class SymblService {
  symbl = new Symbl({
    appId: '6676375767564b36576f4a4f424f6c313959736a6b4370334135624a65366657',
    appSecret:
      '48324e6a613136464634326e4a4f466e3037485a6153377a5a5268693772456b48323273635f56666458566331654f626c36556c6d46516e326b574d43597345',
    // accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUT…97WlWTcwPKms5eA_rRvsQmVKn1YpmzVu-HA1ln7T-9xQLfhkg',
  });

  options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'video/mp4',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: null,
  };

  conversationOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  audioOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'audio/mp3',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: null,
  };

  conversationId: string | null = null;
  jobId: string | null = null;

  constructor(private http: HttpClient) {}

  attachVideo(data: any) {
    this.options.body = data;
  }

  attachAudio(data: any) {
    this.audioOptions.body = data;
  }

  submitVideo() {
    fetch(
      'https://api.symbl.ai/v1/process/video?customVocabulary=&detectPhrases=true&detectEntities=true',
      this.options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.conversationId = response.conversationId;
        this.jobId = response.jobId;
        if (this.conversationId) {
          alert('Video submitted successfully');
        } else {
          alert('No file added!');
        }
        // this.checkStatus();
      })
      .catch((err) => console.error(err));
  }

  checkStatus() {
    return fetch(`https://api.symbl.ai/v1/job/${this.jobId}`, this.conversationOptions);
      // .then((response) => response.json())
      // .then((response) => {
      //   console.log(response);
      //   if (response.status === 'in_progress') {
      //     alert('The video is still being processed. Try again later');
      //   } else {
      //     console.log(response.status);
      //     alert('Video processed successfully');
      //   }
      // })
      // .catch((err) => console.error(err));
  }

  getSummary() {
    return fetch(
      `https://api.symbl.ai/v1/conversations/${this.conversationId}/summary`,
      this.conversationOptions
    );
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log('Summary', response);
    //   return response;
    // })
    // .catch((err) => console.error(err));
  }

  getMessages() {
    return fetch(
      `https://api.symbl.ai/v1/conversations/${this.conversationId}/messages?sentiment=true`,
      this.conversationOptions
    );
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log('Get Messages', response);
    //   return response;
    // })
    // .catch((err) => console.error(err));
  }

  getTopics() {
    return fetch(
      `https://api.symbl.ai/v1/conversations/${this.conversationId}/topics?sentiment=true`,
      this.conversationOptions
    );
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log('Get Topics', response);
    //   return response;
    // })
    // .catch((err) => console.error(err));
  }

  getQuestions() {
    return fetch(
      `https://api.symbl.ai/v1/conversations/${this.conversationId}/questions`,
      this.conversationOptions
    );
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log('Get Topics', response);
    //   return response;
    // })
    // .catch((err) => console.error(err));
  }


  getAnalytics() {
    return fetch(
      `https://api.symbl.ai/v1/conversations/${this.conversationId}/analytics`,
      this.conversationOptions
    );
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log(response);
    //   return response.url;
    // })
    // .catch((err) => console.error(err));
  }

  submitAudio() {
    fetch('https://api.symbl.ai/v1/process/audio', this.audioOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  // postVideo() {
  //   this.http
  //     .post('https://api.symbl.ai/v1/process/video', {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'video/mp4',
  //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //       },
  //     })
  //     .subscribe((res: any) => console.log(res));
  // }
  // header = new Headers({
  //   Authorization: `Bearer ${environment.access_token}`,
  //   'Content-Type': 'application/json',
  // });

  async processAudio() {
    const connection = await this.symbl.createAndStartNewConnection();

    connection.on('speech_recognition', (speechData) => {
      const name = speechData.user ? speechData.user.name : 'User';
      const transcript = speechData.punctuated.transcript;
      console.log(name, ': ', transcript);
      return transcript;
    });

    await Symbl.wait(10000);
    await connection.stopProcessing();
    connection.disconnect();
  }

  // submitText(message: any) {
  //   const responesBody = this.http.post(
  //     encodeURI('https://api.symbl.ai/v1/process/text'),
  //     message
  //   );
  //   return responesBody;
  // }
}
