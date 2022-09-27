import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { SymblService } from 'src/app/services/symbl.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  fileName = '';
  summary: any = '';
  topics: any = [];
  messages: any = [];
  analytics: any = [];
  members: any = [];
  metrics: any = [];
  questions: any = [];
  status: string = 'in_progress';
  video: any;

  constructor(
    private symblService: SymblService,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  id: string = '';
  conversationId: string = '';
  jobId: string = '';
  filename: string = '';
  file: any;
  videoUrl: string = '';
  videoData = {
    id: '',
    url: '',
  };
  form = this.formBuilder.group({
    file: [null, Validators.required],
  });

  ngOnInit(): void {
    console.log('Form', this.form);
    this.videoData.id = this.route.snapshot.paramMap.get('id')!;
  }

  getUrl() {
    this.filename = this.route.snapshot.paramMap.get('filename')!;
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id, this.filename);
    this.backendService.getPublicURL(this.filename).subscribe((res) => {
      var url = JSON.parse(JSON.stringify(res));
      if (url.data) {
        this.videoData.url = url.data[0].public_url;
        console.log('Frontend url: ', this.videoData.url);
      } else {
        this.toastr.error(url.error);
      }
    });
  }

  processVideo() {
    if (this.videoData.url.length === 0 || !this.videoData.url) {
      this.toastr.error('Generate a url first');
    } else {
      console.log('Video data', this.videoData);
      this.backendService.processVideo(this.videoData).subscribe((res) => {
        let resp = JSON.parse(JSON.stringify(res));
        console.log('Process', resp);
        if (resp.conversationId || resp.jobId) {
          this.conversationId = resp.conversationId;
          this.jobId = resp.jobId;
          this.toastr.success('Video ready to be processed');
          // setTimeout(() => {
          //   this.checkStatus(resp.jobId);
          // }, 3000);
        } else {
          this.toastr.error('An error occurred');
        }
        //   // if (resp.conversationId || resp.jobId) {
        //   //   this.toastr.success('Processing the video');
        //   //   this.checkStatus();

        //   //   // setTimeout(() => {
        //   //   //   this.checkStatus();
        //   //   // }, 5000);
        //   // } else {
        //   //   this.toastr.error('An error occurred');
        //   // }
        //   // this.checkStatus();
        //   // console.log("In video comp, calling get url: ", this.file.name);
        //   // this.backendService.getPublicURL(this.file.name).subscribe((res) => {
        //   //   var url = JSON.parse(JSON.stringify(res));
        //   //   console.log('Frontend url: ', url.data[0]);

        //   //   this.videoUrl = url.data[0].video_url;
        //   // });
      });
    }
    // alert('File submitted successfully');
    // this.toastr.info('Processing the video... Please wait!');
  }

  getAnalysis() {
    this.backendService
      .checkStatus({ id: this.id, jobId: this.jobId })
      .subscribe((res) => {
        console.log('Check status response: ', res);
        var resp = JSON.parse(JSON.stringify(res));
        if (resp.response.status === 'completed') {
          this.toastr.success('Job status: completed');
          this.getSummary();
          this.getAnalytics();
          this.getTopics();
          this.getMessages();
          this.getQuestions();
        } else {
          this.toastr.warning('Job status: in progress');
        }
        // this.getMessage();
      });
    //   .subscribe((res) => {
    //   console.log('Video status: ', res);
    //   console.log(JSON.parse(JSON.stringify(res)).status);
    //   this.status = JSON.parse(JSON.stringify(res)).status;

    //   if (this.status === 'completed') {
    //     this.toastr.success(`Video processing: ${this.status}`);
    //     console.log(this.status);
    //   } else {
    //     console.log(this.status);
    //   }
    // });
  }

  getSummary() {
    this.backendService
      .getSummary({ id: this.id, conversationId: this.conversationId })
      .subscribe((res) => {
        let resp = JSON.parse(JSON.stringify(res));
        console.log('Summary resp:', resp);
        this.summary = resp.response.summary[0].text;
        console.log('Summary', this.summary);
      });
    // this.symblService
    //   .getSummary()
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.summary = response.summary[0].text;
    //     console.log('Summary', this.summary);
    //   })
    //   .catch((err) => console.error(err));
  }

  getTopics() {
    this.backendService
      .getTopics({ id: this.id, conversationId: this.conversationId })
      .subscribe((res) => {
        var resp = JSON.parse(JSON.stringify(res));
        console.log('Topics resp:', resp);
        this.topics = resp.response.topics;
        console.log("Topics",this.topics);
        
      });
  }

  getMessages() {
    this.backendService
      .getMessages({ id: this.id, conversationId: this.conversationId })
      .subscribe((res) => {
        console.log('Messages resp:', res);
        var resp = JSON.parse(JSON.stringify(res));
        this.messages = resp.response.messages;
        console.log('Get Messages', this.messages);
        
      });
    // this.symblService
    //   .getMessages()
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.messages = response.messages;
    //     console.log('Get Messages', this.messages);
    //   })
    //   .catch((err) => console.error(err));
  }

  getQuestions() {
    this.backendService
      .getQuestions({ id: this.id, conversationId: this.conversationId })
      .subscribe((res) => {
        var resp = JSON.parse(JSON.stringify(res));
        console.log('Questions resp:', resp);
        this.questions = resp.response.messages;
        console.log("Questions", this.questions);
      });
    // this.symblService
    //   .getMessages()
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.questions = response.messages;
    //     console.log('Get Question', response);
    //   })
    //   .catch((err) => console.error(err));
  }

  getAnalytics() {
    this.backendService
      .getAnalytics({ id: this.id, conversationId: this.conversationId })
      .subscribe((res) => {
        console.log('Analytics resp:', res);
        var resp = JSON.parse(JSON.stringify(res));
        // this.summary = resp.summary[0].text;
        this.members = resp.response.members;
        this.metrics = resp.response.metrics;
        console.log("Analytics", this.members, this.metrics);
      });

    // this.symblService
    //   .getAnalytics()
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.members = response.members;
    //     this.metrics = response.metrics;
    //     console.log('Get Analytics', response);
    //   })
    //   .catch((err) => console.error(err));
  }

  // postForm() {
  //   if (this.file) {
  //     const formData = new FormData();
  //     formData.append('file', this.file);
  //     console.log(formData);
  //     this.backendService.submitVideo(formData).subscribe((res) => {
  //       console.log("Frontend upload respones: ", res);
  //     })
  //       // this.getUrl();
  //   } else {
  //     this.toastr.warning('No file chosen yet!');
  //   }
  // }

  // onFileChange(event: any) {
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     this.file = file;
  //     this.fileName = file.name;
  //     this.disable = false;
  //   }
  // }

  getMessage() {
    this.backendService.getMessages(this.file.name).subscribe((res) => {
      console.log(res);
      var resp = JSON.parse(JSON.stringify(res));
      this.messages = resp.messages;
      console.log('Get Messages', this.messages);
    });
  }

  start() {
    this.symblService.processAudio();
    // console.log(name);
  }
  // postFileTo() {
  //   this.backendService.postFile();
  // }

  post() {
    // this.symblService.submitVideo();
    // this.findStatus();
    const formData = new FormData();
    formData.append('file', this.video, this.video.name);
    console.log(formData);

    this.backendService.submitVideo(formData);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      console.log(file);
      this.video = file;

      // this.backendService.attachVideo(file);
    }
  }

  findStatus() {
    this.symblService
      .checkStatus()
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 'completed') {
          console.log(response.status);
          // this.getSummary();
          // alert('Video processed successfully');
          // this.getTopics();
          // this.getMessages();
          // this.getAnalytics();
          // this.getQuestions();
        } else {
          alert('The video is still being processed...');
        }
      })
      .catch((err) => console.error(err));
  }

  // getAnalytics() {
  //   const url = this.symblService.getAnalytics();
  //   this.router.navigate([url]);
  // }
}
