import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

@Component({
  selector: 'edit-collection',
  templateUrl: './edit-collection.dialog.html',
  styleUrls: ['./edit-collection.dialog.scss']
})
export class EditCollectionDialog implements OnInit {

  constructor( public dialogRef: MatDialogRef<EditCollectionDialog>,  
               private collectionService : CollectionService, 
               @Inject(MAT_DIALOG_DATA) public collection: Collection) {}

  ngOnInit() {    
  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.collection).subscribe(() => {
    });
    this.dialogRef.close();      
  }

  changeName(name: string) {
    let update : Collection = {
       collectionId: this.collection.collectionId,
       name: name, 
    }
    this.collectionService.updateCollection(update).subscribe();
    this.dialogRef.close();
  }

}
