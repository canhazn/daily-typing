import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

// import { CollectionService } from '../collection.service';
import { Collection } from '@store/model/collection.model';

import { CreateCollectionDialog } from './dialog/create-collection/create-collection.dialog';
import { EditCollectionDialog }   from './dialog/edit-collection/edit-collection.dialog';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

	@Input() collection : Collection;

  constructor(public dialog: MatDialog, private router: Router) { }


  navigate($event) {
    // console.log($event.target.tagName);
    if (!($event.target.tagName == 'MAT-ICON' || $event.target.tagName == 'BUTTON'))
      this.router.navigate([`collected/${this.collection.collectionId}`]);
  }

  ngOnInit() {

  }

  openEditCollectionDialog(): void {
    const dialogRef = this.dialog.open(EditCollectionDialog, {
      width: '90%',
      maxWidth: '800px',      
      data: Object.assign({}, this.collection),
    });

    // dialogRef.beforeClose().subscribe((result: Collection) => {      
    //   if (!result || !result.name) return;
    // });
  }

  openCreateCollectionDialog(): void {
    const dialogRef = this.dialog.open(CreateCollectionDialog, {
      width: '90%',
      maxWidth: '800px',            
    });    
  }
}
