import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-botones',
  standalone: false,
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
})
export class BotonesComponent implements OnInit {
  @ViewChild('botonesDropdown') botonesDropdown!: ElementRef;
  @ViewChild('botonesNormal') botonesNormal!: ElementRef;

  @Input() dropdown: Boolean = false;
  @Input() botones: String[] = [];
  @Output() eventCancel = new EventEmitter<any>();
  @Output() eventSave = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  validateIfExists(boton: any): Boolean {
    if (this.botones.find(i => i == boton)) {
      return true
    }

    return false;
  }

}