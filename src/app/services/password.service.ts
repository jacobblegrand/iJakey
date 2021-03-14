import { Password } from './../password';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwordCollection: AngularFirestoreCollection<Password>;

  private passwords: Observable<Password[]>;
  constructor(db: AngularFirestore) {
    this.passwordCollection = db.collection<Password>('passwords');
    this.passwords = this.passwordCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data };
        }).sort((a, b) => {
          const name1 = a.Service.toLowerCase(), name2 = b.Service.toLowerCase();
          if (name1 < name2) { return -1; }
          if (name1 > name2) { return 1; }
          return 0;
        });
      })
    );
  }

  getPasswords() {
    return this.passwords;
  }

  getPassword(id: string) {
    return this.passwordCollection.doc<Password>(id).valueChanges();
  }

  updatePassword(password: Password, id: string) {
    return this.passwordCollection.doc(id).update(password);
  }

  addPassword(password: Password) {
    return this.passwordCollection.add(password);
  }

  removePassword(id: string) {
    return this.passwordCollection.doc(id).delete();
  }
}
