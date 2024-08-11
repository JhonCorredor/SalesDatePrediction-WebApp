import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService, Messages, MessageType } from '../general/helper.service';
import { GeneralService } from '../general/generic.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatatableParameter } from '../general/datatable.parameters';

@Component({
	selector: 'app-order-form',
	standalone: false,
	templateUrl: './order-form.component.html',
	styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnInit {
	custId: number = 0;
	title = '';
	botones: String[] = ['btn-cancel', 'btn-save'];
	frmOrder: FormGroup;
	statusForm: boolean = true;
	listEmployee: any[] = [];
	listShipper: any[] = [];
	listProduct: any[] = [];
	dataTableParameter = new DatatableParameter();

	constructor(private service: GeneralService, private modalActive: NgbActiveModal, public helperService: HelperService) {
		this.frmOrder = new FormGroup({
			OrderId: new FormControl(0),
			CustId: new FormControl(null),
			EmpId: new FormControl(null, Validators.required),
			OrderDate: new FormControl(null, Validators.required),
			RequiredDate: new FormControl(null, Validators.required),
			ShippedDate: new FormControl(null),
			ShipperId: new FormControl(null, Validators.required),
			Freight: new FormControl(0, Validators.required),
			ShipName: new FormControl('', Validators.required),
			ShipAddress: new FormControl('', Validators.required),
			ShipCity: new FormControl('', Validators.required),
			ShipRegion: new FormControl(''),
			ShipPostalCode: new FormControl(''),
			ShipCountry: new FormControl('', Validators.required),
			//Order Deails
			ProductId: new FormControl(null, Validators.required),
			UnitPrice: new FormControl(0, Validators.required),
			Qty: new FormControl(0, Validators.required),
			Discount: new FormControl(0, Validators.required),
		});
	}

	ngOnInit(): void {
		this.createDataTableParameter();
		this.createSelects();
	}

	createDataTableParameter() {
		this.dataTableParameter.pageNumber = '';
		this.dataTableParameter.pageSize = '';
		this.dataTableParameter.filter = '';
		this.dataTableParameter.columnOrder = '';
		this.dataTableParameter.directionOrder = '';
		this.dataTableParameter.columnFilter = '';
	}

	createSelects() {
		this.createListEmployee();
		this.createlistShipper();
		this.createlistProduct();
	}

	createListEmployee() {
		this.service.get('Employee', 'datatable', false, false, this.dataTableParameter).subscribe(
			(response) => {
				if (response.status) {
					this.listEmployee = response.data;
				}
			},
			(error) => {
				this.helperService.showMessage(MessageType.WARNING, error.message);
			}
		);
	}

	createlistShipper() {
		this.service.get('Shipper', 'datatable', false, false, this.dataTableParameter).subscribe(
			(response) => {
				if (response.status) {
					this.listShipper = response.data;
				}
			},
			(error) => {
				this.helperService.showMessage(MessageType.WARNING, error.message);
			}
		);
	}

	createlistProduct() {
		this.service.get('Product', 'datatable', false, false, this.dataTableParameter).subscribe(
			(response) => {
				if (response.status) {
					this.listProduct = response.data;
				}
			},
			(error) => {
				this.helperService.showMessage(MessageType.WARNING, error.message);
			}
		);
	}

	cancel() {
		this.modalActive.close(null);
	}

	save() {
		if (this.frmOrder.invalid) {
			this.statusForm = false;
			this.helperService.showMessage(MessageType.WARNING, Messages.EMPTYFIELD);
			return;
		}
		this.frmOrder.controls['CustId'].setValue(this.custId);
		var ProductId = this.frmOrder.controls['ProductId'].value;
		var UnitPrice = this.frmOrder.controls['UnitPrice'].value;
		var Qty = this.frmOrder.controls['Qty'].value;
		var Discount = this.frmOrder.controls['Discount'].value;

		this.service.save('Order', 0, this.frmOrder.value).subscribe(
			(response) => {
				if (response.status) {
					this.saveOrderDetail(response.data.orderId, ProductId, UnitPrice, Qty, Discount);
				} else {
					this.helperService.showMessage(MessageType.WARNING, Messages.SAVEERROR);
				}
			},
			(error) => {
				this.helperService.showMessage(MessageType.WARNING, error.message);
			}
		);
	}

	saveOrderDetail(OrderId: number, ProductId: number, UnitPrice: number, Qty: number, Discount: number) {
		var data = {
			OrderId: OrderId,
			ProductId: ProductId,
			UnitPrice: UnitPrice,
			Qty: Qty,
			Discount: Discount,
		};

		this.service.save('OrderDetail', 0, data).subscribe(
			(response) => {
				if (response.status) {
					this.modalActive.close(true);
					this.helperService.showMessage(MessageType.SUCCESS, Messages.SAVESUCCESS);
				} else {
					this.helperService.showMessage(MessageType.WARNING, Messages.SAVEERROR);
				}
			},
			(error) => {
				this.helperService.showMessage(MessageType.WARNING, error.message);
			}
		);
	}
}
