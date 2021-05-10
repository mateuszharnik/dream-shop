import { Injectable } from '@angular/core';

const getDocument = (): Document => document;

@Injectable({
  providedIn: 'root',
})
export class DocumentRefService {
  get nativeDocument(): Document {
    return getDocument();
  }
}
