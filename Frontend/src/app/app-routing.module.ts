import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './eco/form/form.component';
import { ResultComponent } from './eco/result/result.component';

const routes: Routes = [
  {
    path:'form',
    component:FormComponent
  },
  {
    path:'result',
    component:ResultComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
