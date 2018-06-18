import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { FeaturedPage } from './featured';
import { ComponentsModule } from '../../components/components.module';

@IonicPage()
@NgModule({
  declarations: [
    FeaturedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeaturedPage),
    ComponentsModule,
  ],
})
export class FeaturedPageModule {}
