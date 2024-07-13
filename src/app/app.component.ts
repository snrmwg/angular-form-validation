import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent {
  title = 'app1';
  model ={name:'', email:''};

  fillForm() {
    this.model = {name: 'John Doe', email: 'john@doe.com'};
  }

  handleForm() {
    console.log('handleForm', this.model);
  }
}
