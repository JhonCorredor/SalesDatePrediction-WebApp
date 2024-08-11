import { Component, OnInit, NgModule, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../generic.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../generic.service';
import { DatatableParameter } from '../datatable.parameters';
import { DataTableDirective } from 'angular-datatables';
import { HelperService } from '../helper.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-table',
  standalone: false,
  templateUrl: './modal-table.component.html',
  styleUrl: './modal-table.component.css'
})
export class ModalTableComponent implements OnInit {
  public dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  title = "";
  botones: String[] = ['btn-cancel'];
  serviceName = "";
  endPoint = "";
  dataTableParameter = new DatatableParameter();
  isForeignKey = false;
  isRangeDate = false;
  foreignKey = 0;
  nameForeignKey = "";
  startDate = "";
  endDate = "";
  columnOrder = 0;
  directionOrder = "desc";
  columns: any[] = [];

  constructor(
    private service: GeneralService,
    private modalActive: NgbActiveModal,
    public helperService: HelperService,
  ) {

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

  createDataTableParameter() {
    this.dataTableParameter.pageNumber = "";
    this.dataTableParameter.pageSize = "";
    this.dataTableParameter.filter = "";
    this.dataTableParameter.columnOrder = "";
    this.dataTableParameter.directionOrder = "";
    this.dataTableParameter.columnFilter = "";
    
    if (this.isForeignKey) {
      this.dataTableParameter.foreignKey = this.foreignKey;
      this.dataTableParameter.nameForeignKey = this.nameForeignKey;
    }

    if (this.startDate != "" && this.endDate != "") {
      this.dataTableParameter.fechaInicio = this.startDate;
      this.dataTableParameter.fechaFin = this.endDate;
    }

  }

  createlist() {
    this.createDataTableParameter();
    this.dtOptions = {
      dom: 'lrtip',
      processing: true,
      ordering: true,
      responsive: true,
      paging: true,
      order: [this.columnOrder, this.directionOrder],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.service.get(this.serviceName, this.endPoint, this.isForeignKey, this.isRangeDate, this.dataTableParameter).subscribe((res) => {
          callback({
            recordsTotal: res.data.length,
            recordsFiltered: res.data.length,
            draw: dataTablesParameters.draw,
            data: res.data,
          });
        });
      },
      columns: this.columns
    };
  }

  cancel() {
    this.modalActive.close(null);
  }
}

@NgModule({
  declarations: [
    ModalTableComponent
  ],
  imports: [
    CommonModule,
    GeneralModule,
  ]
})
export class ModalTableModule { }