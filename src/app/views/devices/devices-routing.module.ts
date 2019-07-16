import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDevicesComponent } from './client/client-devices.component';
import { AddClientDevicesComponent } from './client/add-client-devices.component';
import { AuthGuard } from '../../guards/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Device'
    },
    children: [
      {
        path: '',
        redirectTo: 'devices'
      },
      {
        path: 'client',
        component: ClientDevicesComponent,
        data: {
          title: 'Client'
        }
      },
      {
        path: 'add-client',
        component: AddClientDevicesComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'add-client/:id',
        component: AddClientDevicesComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'list-client',
        component: ClientDevicesComponent,
        data: {
          title: 'List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule {}
