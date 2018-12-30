import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Collection } from '@store/model/collection.model';

import { EditCollectionDialog } from './dialog/edit-collection.dialog';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, take, delay, map } from 'rxjs/operators';
@Component({
  selector: 'app-edit-collection-btn',
  templateUrl: './edit-collection-btn.component.html',
  styleUrls: ['./edit-collection-btn.component.scss']
})
export class EditCollectionBtnComponent implements OnInit {
  
  @Input() collection : Collection;

  constructor(private dialog: MatDialog) { }
  
  openEditCollectionDialog(): void {
    const dialogRef = this.dialog.open(EditCollectionDialog, {
      width: '90%',
      maxWidth: '800px',      
      data: Object.assign({}, this.collection),
    });
  }
  
  ngOnInit() { }
}