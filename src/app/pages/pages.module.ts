import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective } from 'ngx-mask';
import { PagesRoutingModule } from './pages-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { GeneralModule } from './general/generic.module';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule({
  declarations: [
    CustomersComponent,
    OrderFormComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    GeneralModule,
    NgxMaskDirective
  ],
  exports: [
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
export class PagesModule { }
