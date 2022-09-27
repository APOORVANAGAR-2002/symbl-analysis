import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SymblService } from './services/symbl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'speech-to-text';
  fileName = '';
  summary: any = '';
  topics: any = [];
  messages: any = [];
  // message = {
  //   messages: [
  //     {
  //       payload: {
  //         content:
  //           "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you're providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family?  That's it.  Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
  //         contentType: 'text/plain',
  //       },
  //       from: {
  //         name: 'John',
  //         userId: 'john@example.com',
  //       },
  //     },
  //   ],
  // };

  constructor(private symblService: SymblService, private router: Router) {}

  // submit() {
  //   this.symblService.submitText(this.message).subscribe((res) => {
  //     console.log(res);
  //   });
  // }
  start() {
    this.symblService.processAudio();
    // console.log(name);
  }

  post() {
    this.symblService.submitVideo();
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
    const status = this.symblService.checkStatus();
    console.log(status);
  }

  getAnalytics() {
    const url = this.symblService.getAnalytics();
    this.router.navigate([url]);
  }

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
}
