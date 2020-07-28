import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

export interface AuthResponseData {
    token: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    z

    constructor(private httpClient: HttpClient, private router: Router, private alertController: AlertController) {
    }

    authenticate(mail: string, password: string) {
        return this.httpClient
            .post<AuthResponseData>("http://localhost:9000/login", {"mail": mail, "password": password}, {
                headers:
                    {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,HEAD',
                        'Access-Control-Allow-Headers': '*'
                    }
            })
            .pipe(catchError(err => this.handleError(err)),
                tap(token =>
                    this.handleToken(token)));

    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        this.onLoginErrorOccured();
        return throwError("authorization error, try again")
    }


    async onLoginErrorOccured() {
        const alert = await this.alertController.create({
                header: 'LOGIN ERROR',
                message: 'Wrong password or email...',
                buttons: ['Q']
            })
        ;
        await alert.present();
    }


    private handleToken(token) {
        console.log(token);
        localStorage.setItem("token", token);
        this.router.navigate(['/quotes-list']);
    }

    logOut() {
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
    }


}


