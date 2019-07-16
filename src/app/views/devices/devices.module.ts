import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

// Devices Routing
import { DevicesRoutingModule } from './devices-routing.module';
import { ClientDevicesComponent } from './client/client-devices.component';
import { AddClientDevicesComponent } from './client/add-client-devices.component';

//Datepicker Module
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    DevicesRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    DataTablesModule
  ],
  declarations: [
    ClientDevicesComponent,
    AddClientDevicesComponent
  ]
})
export class DevicesModule { }
