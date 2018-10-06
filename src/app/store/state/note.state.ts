import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { take, tap } from 'rxjs/operators';

