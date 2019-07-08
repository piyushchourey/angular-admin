import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { PaginationsComponent } from './paginations.component';
import {PopoversComponent} from './popovers.component';
import {ProgressComponent} from './progress.component';
import {TooltipsComponent} from './tooltips.component';
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
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'paginations',
        component: PaginationsComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popover'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips'
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
