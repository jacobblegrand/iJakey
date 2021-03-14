import { Component, OnInit } from '@angular/core';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';

// TODO:: More secure Firebase authentication, fingerprint authentication,
//        prettier styling



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  fingerprintOptions: FingerprintOptions;

  constructor(private fingerAuth: FingerprintAIO, private router: Router) {}

  ngOnInit() {
    this.fingerprint();
  }

  fingerprint() {
    this.fingerAuth.show({
     title: 'Fingerprint authentication'
    }).then(result => {
      console.log(result);
      this.router.navigate(['/password-list']);
    }).catch(err => {
      console.log(err);
    });
  }
}
