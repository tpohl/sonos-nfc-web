import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DeviceManageComponentComponent } from './device-manage-component/device-manage-component.component';

const appRoutes: Routes = [
  {
    path: 'manage',
    component: DeviceManageComponentComponent
  },
  { path: '',
    redirectTo: '/manage',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DeviceManageComponentComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- enable for debugging purposes only
    ),
    BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [DeviceManageComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
