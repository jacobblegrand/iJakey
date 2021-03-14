import { PasswordService } from './../../services/password.service';
import { Component, OnInit } from '@angular/core';
import { Password } from 'src/app/password';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-details',
  templateUrl: './password-details.page.html',
  styleUrls: ['./password-details.page.scss'],
})
export class PasswordDetailsPage implements OnInit {

  password: Password = {
    Service: null,
    Password: null
  };

  dinoPassReturn: Observable<any>;

  passwordId = null;

  constructor(private passwordService: PasswordService, private route: ActivatedRoute,
              private loadingController: LoadingController, private nav: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.passwordId = this.route.snapshot.params['id'];
    if (this.passwordId) {
      this.loadPassword();
    } else {
      this.genPassword();
    }
  }

  async loadPassword() {
    const loading = await this.loadingController.create({
      message: 'Loading password'
    });
    await loading.present();

    this.passwordService.getPassword(this.passwordId).subscribe(res => {
      loading.dismiss();
      this.password = res;
    });
  }

  async savePassword() {
    const loading = await this.loadingController.create({
      message: 'Saving password'
    });
    await loading.present();

    if (this.passwordId) {
      this.passwordService.updatePassword(this.password, this.passwordId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('password-list');
      });
    } else {
      this.passwordService.addPassword(this.password).then(() => {
        loading.dismiss();
        this.nav.navigateBack('password-list');
      });
    }
  }

  async genPassword() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present;
    this.dinoPassReturn = this.http.get('https://www.dinopass.com/password/strong', {responseType: 'text'});
    this.dinoPassReturn
      .subscribe(data => {
        this.password.Password = data;
      });
  }

}
