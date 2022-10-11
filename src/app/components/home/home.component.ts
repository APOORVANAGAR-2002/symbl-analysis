import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';
import { SymblService } from 'src/app/services/symbl.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  fileName = '';
  summary: any = '';
  topics: any = [];
  messages: any = [];
  analytics: any = [];
  members: any = [];
  metrics: any = [];
  questions: any = [];

  constructor(
    private symblService: SymblService,
    private router: Router,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  file: any;
  videoUrl: string = '';
  videoId: string = '';
  form = this.formBuilder.group({
    file: [null, Validators.required],
  });

  ngOnInit(): void {}

  postForm() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      console.log(formData);
      this.getToken();
      this.backendService.submitVideo(formData).subscribe((res) => {
        console.log('Frontend upload respones: ', res);
        let response = JSON.parse(JSON.stringify(res));
        if (response.data[0]) {
          this.videoId = response.data[0].id;
          this.toastr.success('Video uploaded successfully!');
          this.router.navigate(['video', this.file.name, this.videoId]);          
        } else {
          this.toastr.error("An error occurred!");
        }
      });
      // this.getUrl();
    } else {
      this.toastr.warning('No file chosen yet!');
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
      this.fileName = file.name;
    }
  }

  routeTo(target: string) {
    this.router.navigate([`${target}`]);
  }

  start() {
    this.symblService.processAudio();
    // console.log(name);
  }

  post() {
    this.symblService.submitVideo();
    this.findStatus();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      console.log(formData);
      this.symblService.attachVideo(file);
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
          this.getSummary();
          alert('Video processed successfully');
          this.getTopics();
          this.getMessages();
          this.getAnalytics();
          this.getQuestions();
        } else {
          alert('The video is still being processed...');
        }
      })
      .catch((err) => console.error(err));
  }

  getToken(){
    this.backendService.getAccessToken().subscribe((res)=>{
      console.log(res);
      localStorage.setItem('accessToken', JSON.stringify(res));
      console.log("Access Token", localStorage.getItem('accessToken'));
    })
  }

  // getAnalytics() {
  //   const url = this.symblService.getAnalytics();
  //   this.router.navigate([url]);
  // }

  getSummary() {
    this.symblService
      .getSummary()
      .then((response) => response.json())
      .then((response) => {
        this.summary = response.summary[0].text;
        console.log('Summary', this.summary);
      })
      .catch((err) => console.error(err));
  }

  getTopics() {
    this.symblService
      .getTopics()
      .then((response) => response.json())
      .then((response) => {
        this.topics = response.topics;
        console.log('Topics', this.topics);
      })
      .catch((err) => console.error(err));
  }

  getMessages() {
    this.symblService
      .getMessages()
      .then((response) => response.json())
      .then((response) => {
        this.messages = response.messages;
        console.log('Get Messages', this.messages);
      })
      .catch((err) => console.error(err));
  }

  getQuestions() {
    this.symblService
      .getMessages()
      .then((response) => response.json())
      .then((response) => {
        this.questions = response.messages;
        console.log('Get Question', response);
      })
      .catch((err) => console.error(err));
  }

  getAnalytics() {
    this.symblService
      .getAnalytics()
      .then((response) => response.json())
      .then((response) => {
        this.members = response.members;
        this.metrics = response.metrics;
        console.log('Get Analytics', response);
      })
      .catch((err) => console.error(err));
  }
}
