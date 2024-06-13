import { TestBed } from '@angular/core/testing';

import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { cold } from 'jest-marbles';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';

const userCredentialMock = {} as UserCredential;
const userMock = {
  uid: 'mock-uuid',
  email: 'mock-email',
};
const userBehaviorSubject = new BehaviorSubject<typeof userMock | null>(userMock);

jest.mock('@angular/fire/auth', () => ({
  Auth: {},
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  user: jest.fn().mockImplementation(() => userBehaviorSubject.asObservable()),
}));

describe('AuthService', () => {
  let service: AuthService;
  let auth: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Auth, useValue: Auth }],
    });
    service = TestBed.inject(AuthService);
    auth = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should call signInWithEmailAndPassword with auth, email, password arguments', (done) => {
      (signInWithEmailAndPassword as jest.Mock).mockImplementationOnce(() => Promise.resolve(userCredentialMock));

      service.signIn('email', 'password').subscribe(() => {
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'email', 'password');

        done();
      });
    });

    it('should return void observable', (done) => {
      (signInWithEmailAndPassword as jest.Mock).mockImplementationOnce(() => Promise.resolve(userCredentialMock));

      service.signIn('email', 'password').subscribe((result) => {
        expect(result).toEqual(void 0);

        done();
      });
    });

    it('should return error observable', (done) => {
      (signInWithEmailAndPassword as jest.Mock).mockImplementationOnce(() => Promise.reject('error/code'));

      service
        .signIn('email', 'password')
        .pipe(catchError((e) => of(e)))
        .subscribe((result) => {
          expect(result).toEqual('error/code');

          done();
        });
    });
  });

  describe('signUp', () => {
    it('should call createUserWithEmailAndPassword with auth, email, password arguments', (done) => {
      (createUserWithEmailAndPassword as jest.Mock).mockImplementationOnce(() => Promise.resolve(userCredentialMock));

      service.signUp('email', 'password').subscribe(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'email', 'password');

        done();
      });
    });

    it('should return void observable', (done) => {
      (createUserWithEmailAndPassword as jest.Mock).mockImplementationOnce(() => Promise.resolve(userCredentialMock));

      service.signUp('email', 'password').subscribe((result) => {
        expect(result).toEqual(void 0);

        done();
      });
    });

    it('should return error observable', (done) => {
      (createUserWithEmailAndPassword as jest.Mock).mockImplementationOnce(() => Promise.reject('error/code'));

      service
        .signUp('email', 'password')
        .pipe(catchError((e) => of(e)))
        .subscribe((result) => {
          expect(result).toEqual('error/code');

          done();
        });
    });
  });

  describe('user$', () => {
    it('should return user object observable', () => {
      userBehaviorSubject.next(userMock);
      const expected = cold('a', {
        a: { id: userMock.uid, email: userMock.email },
      });

      expect(service.user$).toBeObservable(expected);
    });

    it('should return null observable', () => {
      userBehaviorSubject.next(null);
      const expected = cold('a', {
        a: null,
      });

      expect(service.user$).toBeObservable(expected);
    });
  });
});
