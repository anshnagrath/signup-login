import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showSignUp: Boolean;
  selectedMode: string;
  constructor() { }

  ngOnInit() {
  }
  selectedMethod(selectedMode: string) {
    this.selectedMode = selectedMode;
    (selectedMode) ? this.showSignUp = true : this.showSignUp = false;
  }
}
