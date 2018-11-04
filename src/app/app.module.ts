import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FileUploadModule} from 'ng2-file-upload';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {MatSelectModule} from '@angular/material/select';
 import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from './app.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
 import {PostCreateComponent} from './posts/post-create/post-create.component';
 import {PostListComponent} from './posts/post-list/post-list.component';
 import {MatFormFieldModule } from '@angular/material/form-field';
 import { FileSaverModule } from 'ngx-filesaver';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {SignupComponent } from './auth/signup/signup.component';
import {UploadComponent } from './fileupload/fileupload.component';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { AuthInterceptor } from './auth/auth-interceptor';
import { PostsService } from './posts/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostCreateComponent,
    HeaderComponent,
    LoginComponent,
    UploadComponent,
   // FileUploadComponent,
    SignupComponent
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    // FileUploadComponent,
    MatToolbarModule,
    MatExpansionModule,
    FileSaverModule ,
    FileUploadModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule

  ],
  // FORHTTPINTERCEPTOR TOKEN WE HAVE TOPROVIDE A NEW VALUE THAT IS AFTER COMMA
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
