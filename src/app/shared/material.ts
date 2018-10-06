import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatMenuModule, MatGridListModule, MatInputModule, MatCardModule, MatChipsModule, MatDialogModule, MatBadgeModule, MatListModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatMenuModule, MatGridListModule, MatInputModule, MatCardModule, MatChipsModule, MatDialogModule, MatBadgeModule, MatListModule],
})
export class MaterialModule { }