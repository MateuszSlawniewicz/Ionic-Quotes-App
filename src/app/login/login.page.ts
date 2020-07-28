import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "./authentication.service";
import {Subscription} from "rxjs";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    private loadingData = false;
    private authSubscription: Subscription;

    constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
        this.loginForm = this.formBuilder.group({
            mail: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }


    ngOnInit(): void {

    }


    onLogin() {
        this.loadingData = true;
        console.log('push')
        if (this.loginForm.valid) {
            this.authSubscription = this.authenticationService
                .authenticate(this.loginForm.value.mail, this.loginForm.value.password)
                .subscribe();
            this.loginForm.reset();
        }
        this.loadingData = false;
    }


}
