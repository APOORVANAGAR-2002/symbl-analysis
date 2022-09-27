import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import {} from 'rxjs/BehaviourSubject'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
