import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  URL = 'http://127.0.0.1:8000';
  options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'video/mp4',
    },
    body: null,
  };
  accessToken = localStorage.getItem('accessToken');

  // headers = new HttpHeaders()
  // .set('accessToken', 'localStorage.getItem('accessToken')')
  constructor(private http: HttpClient) { }

  attachVideo(data: any) {
    this.options.body = data;
  }

  postFile(data: any) {
    // this.http.post(this.URL, data);
  }


  submitVideo(formData: any) {
    console.log(formData);
    return this.http.post(`${this.URL}/upload`, formData);
    //   .subscribe(res => {
    //   console.log("Form data uploaded(backend service: ",res);
    //   let filename = JSON.parse(JSON.stringify(res)).file.originalname;
    //   console.log("Backend service res", filename);
    //   // return this.getPublicURL(filename);

    //   // this.processVideo(formData);
    // })
    // const req = new HttpRequest(
    //   'POST',
    //   'http://localhost:8080/api/upload',
    //   formData,
    // );
    // this.http.request(req).subscribe(res => console.log(res)
    // );

    // this.http
    //   .post(`${this.URL}/api/upload`, data)
    //   .subscribe(
    //     (res: any) => {
    //       console.log(res);
    //     },
    //     (error: any) => {
    //       alert('failed to upload');
    //     }
    //   );
    // this.http.post(`${this.URL}/api/upload`, data);

    //   this.attachVideo(data);
    //   fetch(
    //     `${this.URL}/upload`,
    //     this.options
    //   )
    //     .then((response) => response.json())
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => console.error(err));
  }

  getPublicURL(fileid: string) {
    return this.http.get(`${this.URL}/publicUrl/${fileid}`);
  }


  getAccessToken() {
    return this.http.get(`${this.URL}/get_access_token`);
  }

  processVideo(videoData: { id: string; url: string }) {
    console.log(
      videoData,
      videoData.id,
      `${this.URL}/processVideo/${videoData.id}`
    );
    console.log(localStorage.getItem('accessToken'));
    return this.http.post(
      `${this.URL}/processVideo/${videoData.id}`,
      videoData.id, {
      params: {
        accessToken: `${localStorage.getItem('accessToken')}`
      }
    }
      // {
      //   headers: { accessToken: `${localStorage.getItem('accessToken')}` },
      // }
    );
  }

  checkStatus(data: { id: string; jobId: string }) {
    return this.http.get(`${this.URL}/checkstatus/${data.id}`, {
      params: {
        accessToken: `${localStorage.getItem('accessToken')}`
      }
    }
      // , {
      //   headers: { jobId: `${data.jobId}` },
      // }
    );
    // console.log("Res in backend service", res);
  }

  getMessages(data: { id: string; conversationId: string }) {
    return this.http.get(`${this.URL}/messages/${data.id}`, {
      params: {
        accessToken: `${localStorage.getItem('accessToken')}`
      }
    }
      // , {
      //   headers: {
      //     conversationId: `${data.conversationId}`,
      //     accessToken: `${localStorage.getItem('accessToken')}`,
      //   },
      // }
    );
  }

  getSummary(data: { id: string; conversationId: string }) {
    return this.http.get(`${this.URL}/summary/${data.id}`, {
      params: {
        accessToken: `${localStorage.getItem('accessToken')}`
      }
    }
      // , {
      //   headers: {
      //     conversationId: `${data.conversationId}`,
      //     accessToken: `${localStorage.getItem('accessToken')}`,
      //   },
      // }
    );
  }

  getQuestions(data: { id: string; conversationId: string }) {
    return this.http.get(`${this.URL}/question/${data.id}`, {
      params: {
        accessToken: `${localStorage.getItem('accessToken')}`
      }
    }
      // , {
      //   headers: {
      //     conversationId: `${data.conversationId}`,
      //     accessToken: `${localStorage.getItem('accessToken')}`,
      //   },
      // }
    );
  }

  getTopics(data: { id: string; conversationId: string }) {
    return this.http.get(`${this.URL}/topics/${data.id}`, {
      params: {
        accessToken: `${localStorage.getItem('accessToken')}`
      }
    }
      // , {
      //   headers: {
      //     conversationId: `${data.conversationId}`,
      //     accessToken: `${localStorage.getItem('accessToken')}`,
      //   },
      // }
    );
  }

  getAnalytics(data: { id: string; conversationId: string }) {
    return this.http.get(`${this.URL}/analytics/${data.id}`, {
      params: {
        accessToken: `${localStorage.getItem('accessToken')}`
      }
    }
      // , {
      //   headers: {
      //     conversationId: `${data.conversationId}`,
      //     accessToken: `${localStorage.getItem('accessToken')}`,
      //   },
      // }
    );
  }
}
