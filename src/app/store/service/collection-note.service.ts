import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { AuthService } from '@store/service/auth.service';
import { NoteService } from '@store/service/note.service';
import { CollectionService } from '@store/service/collection.service';

import { User }  from '@store/model/auth.model';
import { Collection } from '@store/model/collection.model';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from, forkJoin } from 'rxjs';
import { take, map, tap, switchMap, shareReplay, catchError, filter, share, publish } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CollectionNoteService {
  /**
   * Collect Note: add a noteId into arrayOfNoteId, add collectionId into arrayOfCollectionId
   * Remove Note: remove noteId form arrayOfNoteId, remove collectionId from arrayOfCollectionId
   * Remove Deleted Note: remove noteId form arrayOfNoteId
   * Remove Deleted Collection: ....
   */
  constructor( private noteService: NoteService, private collectionService: CollectionService) {
    
  }

  collectNote(note: Note, collection: Collection) {  
    if (!note.arrayCollectionId) note.arrayCollectionId = [];
    return forkJoin(
      this.noteService.updateNote({ 
        noteId: note.noteId, 
        arrayCollectionId: [...note.arrayCollectionId, collection.collectionId]
      }),
      //-----
      this.collectionService.updateCollection({ 
        collectionId: collection.collectionId, 
        arrayNoteId: [...collection.arrayNoteId, note.noteId]
      })
    )
  }

  removeNote(note: Note, collection: Collection) {
    return forkJoin(
      this.noteService.updateNote({ 
        noteId: note.noteId, 
        arrayCollectionId: note.arrayCollectionId.filter(collectionId => collectionId != collection.collectionId)
      }),
      //-----
      this.collectionService.updateCollection({ 
        collectionId: collection.collectionId, 
        arrayNoteId: collection.arrayNoteId.filter(noteId => noteId != note.noteId)
      })
    )
  }

  removeDeletedNote(note: Note, collectionId: string) {
    return this.collectionService.getCollectionById(collectionId).pipe(      
      switchMap(collection => this.collectionService.updateCollection({
        collectionId: collection.collectionId, 
        arrayNoteId: collection.arrayNoteId.filter(noteId => noteId != note.noteId)
      }))
    )
  }

}