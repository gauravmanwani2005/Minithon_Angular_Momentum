import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './eco/form/form.component';
import { ResultComponent } from './eco/result/result.component';

// Import your components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  // Route for the login page
  { path: 'login', component: LoginComponent },

  // Route for the register page
  { path: 'register', component: RegisterComponent },

  // Default route: Redirects to /login if the path is empty
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard route: Redirects to /login for any other path that doesn't match
  { path: '**', redirectTo: '/login' },

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