import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User as UserFirebase,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  readonly user$: Observable<User> = user(this.auth).pipe(
    map((user: UserFirebase) =>
      user
        ? {
            id: user.uid,
            email: user.email!,
          }
        : null,
    ),
  );

  signIn(email: string, password: string): Observable<void> {
    const signInResult = signInWithEmailAndPassword(this.auth, email, password);

    return from(signInResult).pipe(map(() => void 0));
  }

  signUp(email: string, password: string): Observable<void> {
    const signUpResult = createUserWithEmailAndPassword(this.auth, email, password);

    return from(signUpResult).pipe(map(() => void 0));
  }
}
