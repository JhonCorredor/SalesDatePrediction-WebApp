import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatableParameter } from './datatable.parameters';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    private url = environment.url;
    private header = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.header.set("Content-Type", "application/json");
    }

    public get(ruta: String, endPoint: String, foreignKey: boolean, rangeDate: boolean, data: DatatableParameter): Observable<any> {
        var http = `${this.url}${ruta}/${endPoint}?PageSize=${data.pageSize}&PageNumber=${data.pageNumber}&Filter=${data.filter}&ColumnFilter=${data.columnFilter}&ColumnOrder=${data.columnOrder}&DirectionOrder=${data.directionOrder}`;

        if (foreignKey) {
            http += `&ForeignKey=${data.foreignKey}&NameForeignKey=${data.nameForeignKey}`;
        }

        if (rangeDate) {
            http += `&FechaInicio=${data.fechaInicio}&FechaFin=${data.fechaFin}`;
        }

        return this.http.get<any>(http, { headers: this.header });
    }

    public save(ruta: String, id: any, data: any): Observable<any> {
        if (id) {
            return this.http.put<any>(`${this.url}${ruta}`, data, { headers: this.header });
        }
        return this.http.post<any>(`${this.url}${ruta}`, data, { headers: this.header });
    }

    public delete(ruta: String, id: any): Observable<any> {
        return this.http.delete<any>(`${this.url}${ruta}/${id}`, { headers: this.header });
    }

    public getById(ruta: String, id: any): Observable<any> {
        return this.http.get<any>(`${this.url}${ruta}/${id}`, { headers: this.header });
    }
}