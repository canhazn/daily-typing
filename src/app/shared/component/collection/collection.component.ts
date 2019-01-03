import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from '@store/model/collection.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

	@Input() collection : Collection;

  constructor(private router: Router) { }

  navigate($event) {
    // console.log($event.target.tagName);
    if (!($event.target.tagName == 'MAT-ICON' || $event.target.tagName == 'BUTTON'))
      this.router.navigate([`collected/${this.collection.collectionId}`]);
  }

  ngOnInit() {

  }
}
