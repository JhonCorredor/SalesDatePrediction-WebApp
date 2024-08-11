import { Location, formatNumber } from "@angular/common";
import { Inject, Injectable, LOCALE_ID } from "@angular/core";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    empleadoId = 0;

    constructor(
        private router: Router,
        public _location: Location,
        @Inject(LOCALE_ID) private locale: string
    ) { }

    getLocalDateTime(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    formaterNumber(number: number) {
        return formatNumber(number, this.locale, '1.0-0');
    }

    redirectApp(url: String) {
        this.router.navigate([url]);
    }

    onClickBack() {
        this._location.back();
    }

    showMessage(type: string, message: string, title: string = "Mensaje del sistema") {
        switch (type) {
            case MessageType.ERROR:
                Swal.fire({
                    title: title,
                    text: message,
                    icon: 'error',
                });
                break;
            case MessageType.SUCCESS:
                Swal.fire({
                    title: title,
                    text: message,
                    icon: 'success',
                });
                break;
            case MessageType.WARNING:
                Swal.fire({
                    title: title,
                    text: message,
                    icon: 'warning',
                });
                break;
            case MessageType.PROGRESS:
                Swal.fire({
                    title: title,
                    text: message,
                    icon: 'info',
                });
                break;
            default:
                break;
        }
    }

    convertDateUTCToDMA(date: any) {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(date, 'M/d/yyyy');
        return formattedDate;
    }

    convertDateTime(date: any) {
        const dateObj = new Date(date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();

        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    convertDateTimeFormate12h(date: any) {
        const dateObj = new Date(date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();

        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strHours = String(hours).padStart(2, '0');

        return `${day}/${month}/${year} ${strHours}:${minutes}:${seconds} ${ampm}`;
    }

    getTime(date: any) {
        const dateObj = new Date(date);
        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // la hora '0' debe ser '12'

        return `${hours}:${minutes} ${ampm}`;
    }
}

export const MessageType = {
    SUCCESS: "S",
    WARNING: "W",
    ERROR: "E",
    PROGRESS: "P"
}

export const Messages = {
    SAVESUCCESS: "Registro guardado",
    SAVEERROR: "Error al guardar",
    UPDATESUCCESS: "Registro actualizado",
    UPDATEERROR: "Error al actualizar",
    DELETESUCCESS: "Registro eliminado",
    DELETEERROR: "Error al eliminar",
    EMPTYFIELD: "Faltan campos por llenar",
    INVALIDUSER: "Usuario o contraseña incorrectos",
    INVALIDOPERATION: "Operación no permitida",
    INVALIDPASSWORD: "Contraseñas no coinciden",
    EXPIREDSESION: "Su sesion ha expirado, ingrese nuevamente",
    DELETEFACTURE: "No se puede eliminar una factura aprobada",
    UPDATEFACTURE: "No se puede editar una factura aprobada",
    INVALIDFILE: "Archivo no permitido",
    SAVEFILE: "Archivo cargado exitosamente",
    PROGRESS: "Procesando Datos, Espere por favor...",
}
