import { Component, OnInit } from '@angular/core';
import { Password } from 'src/app/password';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.page.html',
  styleUrls: ['./password-list.page.scss'],
})
export class PasswordListPage implements OnInit {

  passwords: Password[];

  constructor(private passwordService: PasswordService) {}

  ngOnInit() {
    this.passwordService.getPasswords().subscribe(res => {
      this.passwords = res;
    });
  }
  remove(item) {
    this.passwordService.removePassword(item.id);
  }
}
