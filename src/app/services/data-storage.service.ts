import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {QuoteModel} from "../models/quote.model";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    quotes: QuoteModel[];

    constructor(private http: HttpClient) {
    }


    fetchData() {
        return this.http
            .get<QuoteModel[]>('http://localhost:9000/quotes', {
                headers:
                    {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,HEAD',
                        'Access-Control-Allow-Headers': '*',
                        'token': localStorage.getItem("token")
                    }
            }).pipe(catchError(err => this.handleError(err)));
    }


    handleError(err) {
        console.log(err);
        return throwError(err);
    }

    addQuote(tag: string, content: string) {
        return this.http
            .post<QuoteModel>('http://localhost:9000/quotes'
                , {
                    'content': content,
                    'keyWord': tag
                }, {
                    headers:
                        {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,HEAD',
                            'Access-Control-Allow-Headers': '*',
                            'token': localStorage.getItem("token")
                        }
                })
            .pipe(catchError(err => this.handleError(err)),
                tap(quote => {
                    console.log(quote);
                }))
    };


    deleteQuote(id: number) {
        return this.http.delete('http://localhost:9000/quotes/' + id, {
            headers:
                {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,HEAD',
                    'Access-Control-Allow-Headers': '*',
                    'token': localStorage.getItem("token")
                }
        })
            .pipe(catchError(err => this.handleError(err))
            );
    }

}
