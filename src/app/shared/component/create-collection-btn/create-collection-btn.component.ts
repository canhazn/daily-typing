import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Collection } from '@store/model/collection.model';

import { CreateCollectionDialog } from './dialog/create-collection.dialog';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, take, delay, map } from 'rxjs/operators';
@Component({
  selector: 'app-create-collection-btn',
  templateUrl: './create-collection-btn.component.html',
  styleUrls: ['./create-collection-btn.component.scss']
})
export class CreateCollectionBtnComponent implements OnInit {
  
  // @Input() collection : Collection;

  constructor(private dialog: MatDialog) { }
  
  openCreateCollectionDialog(): void {
    const dialogRef = this.dialog.open(CreateCollectionDialog, {
      width: '90%',
      maxWidth: '800px',      
    });    
  }
  
  ngOnInit() { }
}