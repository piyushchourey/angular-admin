import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FormsComponent } from './forms.component';
import { TablesComponent } from './tables.component';
import { PaginationsComponent } from './paginations.component';
import { BulkComponentComponent } from './bulk-component.component';
import { AuthGuard } from '../../guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'User'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards'
      },
      {
        path: 'add/:userId',
        component: FormsComponent,
        data: {
          title: 'Edit',
          btnText: 'Update User'
        }
      },
      {
        path: 'add',
        component: FormsComponent,
        data: {
          title: 'Add',
          btnText: 'Add User'
        }
      },
      {
        path: 'list',
        component: TablesComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'bulk',
        component: BulkComponentComponent,
        data: {
          title: 'Bulk Upload'
        }
      },
      {
        path: 'paginations',
        component: PaginationsComponent,
        data: {
          title: 'Pagination'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
