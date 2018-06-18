import { NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [MovieCardComponent],
	imports: [IonicModule],
	exports: [MovieCardComponent]
})
export class ComponentsModule {}
