import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule } from '@angular/material/form-field';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.gaurd';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'create', component: PostCreateComponent , canActivate : [AuthGuard]},
  { path: 'signup', component: SignupComponent , },

  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [ FormsModule, MatFormFieldModule , MatSelectModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
