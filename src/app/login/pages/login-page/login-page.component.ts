import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserHandlerAuthService } from 'src/app/shared/services/user-handler-auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

type MissMatch = { mismatch: boolean };
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  newUserForm: FormGroup;
  isLoading:boolean = false;
  authUserHasError: boolean = false;
  defaultFormBehavior = 'login';
  faUser = faUser;
  faKey = faKey;  
  constructor(
    private fb: FormBuilder, 
    private user: UserHandlerAuthService,
    private router: Router,
    private aRouter: ActivatedRoute,
    
    private userStorage: LocalStorageService
    ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(8), Validators.required]]
      });

      this.newUserForm = this.fb.group(
        {
          email: ['', [Validators.email, Validators.required]],
          acceptTerms: [false, Validators.requiredTrue],
          password: ['', [Validators.minLength(8), Validators.required]],
          confirmPassword: ['', [Validators.minLength(8), Validators.required]],
        }, 
        { validators: this.passwordConfirming });
  }

  ngOnInit(): void {
    const routeParams = this.aRouter.snapshot.paramMap;
    this.defaultFormBehavior = String(routeParams.get('t'));
  }

  get loginUser() {
    return this.loginForm.value;
  }

  get newUser() {
    return this.newUserForm.value;
  }  

  passwordConfirming(c: AbstractControl): MissMatch | null {
    return c.get('password')?.value === c.get('confirmPassword')?.value ? null : {mismatch: true};
  }

  userAuthTask() {
    this.isLoading = true;
    const isLogin = this.defaultFormBehavior === 'login' ? true : false;
    const data = isLogin ? this.loginUser : this.newUser;
    const { email, password } = data;
    if(isLogin) {
      this._signIn(email, password);
    } else {
      this._newUser(email, password);
    }

  }

  private _signIn(email: string, password: string) {    
    this.user.signIn(email, password).then((res:any) => {
      const userEmail = res.user.email;
      this.isLoading = false;
      this.authUserHasError = false;
      this.userStorage.setUser(userEmail);
      this.router.navigate(['/news'])
    }).catch(error => {
      this.isLoading = false;
      const {message, code} = error;
      // This logic should be on backend side
      if(code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        this.authUserHasError = true;
      }
    });    
  }

  private _newUser(email: string, password: string) {
    this.user.newUser(email, password).then((res: any) => {
      this.isLoading = false;
      const userEmail = res.user.email;
      this.userStorage.setUser(userEmail);
      this.router.navigate(['./news']);
    }).catch(err => {
      this.isLoading = false;
      // ToDo: Handler when create account fails
    });
  }

  splitPage() {
    if(this.defaultFormBehavior !== 'login') {
      this.router.navigate(['./auth/login']).then(() => window.location.reload());
    } else {
      this.router.navigate(['./auth/register']).then(() => window.location.reload());
    }
  }

}
