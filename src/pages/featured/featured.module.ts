import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { FeaturedPage } from './featured';

@IonicPage()
@NgModule({
  declarations: [
    FeaturedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeaturedPage),
  ],
})
export class FeaturedPageModule {}
