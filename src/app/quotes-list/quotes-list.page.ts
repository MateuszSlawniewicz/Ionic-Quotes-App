import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../services/data-storage.service";
import {QuoteModel} from "../models/quote.model";
import {AlertController} from "@ionic/angular";
import {AuthenticationService} from "../login/authentication.service";

@Component({
    selector: 'app-quotes-list',
    templateUrl: './quotes-list.page.html',
    styleUrls: ['./quotes-list.page.scss'],
})
export class QuotesListPage implements OnInit {
    quotes: QuoteModel[];


    constructor(private dataStorageService: DataStorageService, private alertController: AlertController, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.dataStorageService.fetchData().subscribe(fetchedQuotes => this.quotes = fetchedQuotes);

    }

    async onOpenQuote(i: number) {
        const alert = await this.alertController.create({
            header: this.quotes.filter(q => q.id === i)[0].keyWord,
            message: this.quotes.filter(q => q.id === i)[0].content,
            buttons: ['Q', {
                text: 'Delete',
                handler: data => {
                    this.dataStorageService.deleteQuote(i).subscribe(() => this.quotes = this.quotes.filter(q => q.id !== i));
                    this.ngOnInit();
                }
            }]
        });
        await alert.present();
    }

    async onAddQuote() {
        const alert = await this.alertController.create({
                header: 'Add quote:',
                inputs: [
                    {
                        name: 'tag',
                        type: 'text',
                        placeholder: 'tag..'
                    },
                    {
                        name: 'content',
                        type: 'textarea',
                        placeholder: 'write your quote...'
                    }

                ],
                buttons: [
                    {
                        text: 'Ok',
                        handler: data => {
                            this.dataStorageService.addQuote(data.tag, data.content).subscribe(() => this.ngOnInit());

                        }
                    },
                    {
                        text: 'Q'
                    }

                ]
            })
        ;

        await alert.present();
    }


    onLogOut() {
        this.authenticationService.logOut();
    }
}




