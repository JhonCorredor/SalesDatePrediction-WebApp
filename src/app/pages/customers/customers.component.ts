import { Component,  OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTableComponent } from '../general/modal-table/modal-table.component';
import { HelperService,  MessageType } from '../general/helper.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatatableParameter } from '../general/datatable.parameters';
import { GeneralService } from '../general/generic.service';
import { BotonesComponent } from '../general/botones/botones.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  public dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  @ViewChild('botonesDatatable') botonesDatatable!: BotonesComponent;
  tableBotones: String[] = ['btn-view-orders', 'btn-new-order'];
  frmSearch: FormGroup;

  constructor(
    private service: GeneralService,
    private modalService: NgbModal,
    public helperService: HelperService,
  ) {
    this.frmSearch = new FormGroup({
      CustomerName: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.createlist();
  }

  ngAfterViewInit() {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  createlist() {
    const that = this;
    var dataTableParameter = new DatatableParameter(); dataTableParameter.pageNumber = ""; dataTableParameter.pageSize = ""; dataTableParameter.filter = ""; dataTableParameter.columnOrder = ""; dataTableParameter.directionOrder = ""; dataTableParameter.columnFilter = "";

    this.dtOptions = {
      dom: 'lrtip',
      processing: true,
      ordering: true,
      responsive: true,
      paging: true,
      order: [0, "desc"],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.service.get("Customer", "getSalesDatePrediction", false, false, dataTableParameter).subscribe((res) => {
          callback({
            recordsTotal: res.data.length,
            recordsFiltered: res.data.length,
            draw: dataTablesParameters.draw,
            data: res.data,
          });
        });
      },
      columns: [
        {
          title: 'Customer Name',
          data: 'customerName',
          className: 'text-center',
        },
        {
          title: 'Last Order Data',
          data: 'lastOrderDate',
          className: 'text-center',
          render: (item: any) => {
            return this.helperService.convertDateUTCToDMA(item);
          },
        },
        {
          title: 'Next Prediced Order',
          data: 'nextPredictedOrder',
          className: 'text-center',
          render: (item: any) => {
            return this.helperService.convertDateUTCToDMA(item);
          },
        },
        {
          title: '',
          data: 'custId',
          className: 'text-center',
          render: function (id: any) {
            const boton = that.botonesDatatable;
            return boton.botonesDropdown.nativeElement.outerHTML.split('$id').join(id);
          }
        },
      ],
      drawCallback: () => {
        $('.btn-dropdown-view-orders')
          .off()
          .on('click', (event: any) => {
            this.service.getById("Customer", event.currentTarget.dataset.id).subscribe(
              (response) => {
                if (response.status) {
                  this.onClickView(response.data.custId, response.data.companyName);
                }
              },
              (error) => {
                that.helperService.showMessage(MessageType.WARNING, error.message);
              }
            );
          });
        $('.btn-dropdown-new-order')
          .off()
          .on('click', (event: any) => {
            this.service.getById("Customer", event.currentTarget.dataset.id).subscribe(
              (response) => {
                if (response.status) {
                  this.onClickNew(response.data.custId, response.data.companyName);
                }
              },
              (error) => {
                that.helperService.showMessage(MessageType.WARNING, error.message);
              }
            );
          });
      }
    };
  }

  refreshList() {
    if (typeof this.dtElement.dtInstance != 'undefined') {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  }

  onClickSearchCustomerName() {
    var CustomerName = this.frmSearch.controls["CustomerName"].value;
    var dataTableParameter = new DatatableParameter(); dataTableParameter.pageNumber = ""; dataTableParameter.pageSize = ""; dataTableParameter.filter = ""; dataTableParameter.columnOrder = ""; dataTableParameter.directionOrder = "";

    if (CustomerName != "") {
      dataTableParameter.filter = CustomerName;
      dataTableParameter.columnFilter = "CompanyName";
    }

    this.service.get("Customer", "getSalesDatePrediction", false, false, dataTableParameter).subscribe((res) => {
      // Actualiza los datos de la tabla
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.clear().rows.add(res.data).draw();
      });
    });

  }

  onClickCleanList() {
    this.frmSearch.controls["CustomerName"].setValue("");
    this.onClickSearchCustomerName();
  }

  onChangeInput() {
    var CustomerName = this.frmSearch.controls["CustomerName"].value;
    if (CustomerName == "") {
      this.onClickSearchCustomerName();
    }
  }

  onClickView(custId: number, customerName: string) {
    const that = this;
    const modal = this.modalService.open(ModalTableComponent, { size: 'xl', keyboard: false, backdrop: true, centered: true });
    modal.componentInstance.title = `${customerName} - Orders`;
    modal.componentInstance.serviceName = "Order";
    modal.componentInstance.endPoint = "datatable";
    modal.componentInstance.columnOrder = 1;
    modal.componentInstance.directionOrder = "desc";
    modal.componentInstance.isForeignKey = true;
    modal.componentInstance.foreignKey = custId;
    modal.componentInstance.nameForeignKey = "custid";

    modal.componentInstance.columns = [
      {
        title: 'Order ID',
        data: 'orderId',
        className: 'text-center',
      },
      {
        title: 'Required Date',
        data: 'requiredDate',
        className: 'text-center',
        render: (item: any) => {
          return that.helperService.convertDateTimeFormate12h(item);
        },
      },
      {
        title: 'Shipped Date',
        data: 'shippedDate',
        className: 'text-center',
        render: (item: any) => {
          return that.helperService.convertDateTimeFormate12h(item);
        },
      },
      {
        title: 'Shipped Name',
        data: 'shipName',
        className: 'text-center',
      },
      {
        title: 'Shipped Address',
        data: 'shipAddress',
        className: 'text-center',
      },
      {
        title: 'Shipped City',
        data: 'shipCity',
        className: 'text-center',
      },
    ]
  }

  onClickNew(custId: number, customerName: string) {
    const modal = this.modalService.open(OrderFormComponent, { size: 'md', keyboard: false, backdrop: true, centered: true });
    modal.componentInstance.title = `${customerName} - New Order`;
    modal.componentInstance.custId = custId;
  }
}