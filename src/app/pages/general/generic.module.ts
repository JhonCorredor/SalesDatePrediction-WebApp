import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonesComponent } from './botones/botones.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsMessagesComponent } from './forms-messages/forms-messages.component';

@NgModule({
  declarations: [
    BotonesComponent,
    FormsMessagesComponent
  ],
  imports: [
    CommonModule,
    NgxMaskDirective
  ],
  exports: [
    BotonesComponent,
    FormsMessagesComponent,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    UiSwitchModule,
    NgxSpinnerModule,
    NgSelectModule,
    HttpClientModule,
    NgxMaskDirective
  ]
})
export class GeneralModule { }
