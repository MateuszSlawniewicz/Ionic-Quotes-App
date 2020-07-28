import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotesListPageRoutingModule } from './quotes-list-routing.module';

import { QuotesListPage } from './quotes-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotesListPageRoutingModule
  ],
  declarations: [QuotesListPage]
})
export class QuotesListPageModule {}
