import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';


import { take, map, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'create-collection',
  templateUrl: './create-collection.dialog.html',
  styleUrls: ['./create-collection.dialog.scss']
})
export class CreateCollectionDialog implements OnInit {

  constructor(  public dialogRef: MatDialogRef<CreateCollectionDialog>,  
                private collectionService : CollectionService ) {}


  ngOnInit() {    
  }

  createCollection(name: string) {    
    if (name == '') return;

    this.collectionService.setNewCollection(name).subscribe();
    this.dialogRef.close();
  }

}
