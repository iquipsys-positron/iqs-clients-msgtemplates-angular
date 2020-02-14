import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'iqs-libs-clientshell2-angular';
import { MsgTemplatesContainerComponent } from './msgtemplates/containers/msgtemplates-container/msgtemplates-container.component';

const routes: Routes = [
  { path: '', component: MsgTemplatesContainerComponent, canActivate: [AuthGuard] },
  { path: '404', redirectTo: '' },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
