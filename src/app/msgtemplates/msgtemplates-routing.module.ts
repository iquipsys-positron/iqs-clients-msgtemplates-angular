import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'iqs-libs-clientshell2-angular';
import { NgModule } from '@angular/core';
import { MsgTemplatesContainerComponent } from './containers/msgtemplates-container/msgtemplates-container.component';


export const routes: Routes = [
  { path: '', component: MsgTemplatesContainerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
