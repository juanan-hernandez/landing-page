import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

@Injectable({
  providedIn:  'root'
})

export class ContactComponent implements OnInit {
  name: string;
  email: string;
  subject: string;
  message: string;
  ngOnInit() {
  }
  /**
   * Process the form we have. Send to whatever backend
   * Only alerting for now
   */
  processForm() {
    const allInfo = `My name is ${this.name}. The subject is ${this.subject}. My email is ${this.email}. My message is ${this.message}`;
    alert('hola');
  }
}
