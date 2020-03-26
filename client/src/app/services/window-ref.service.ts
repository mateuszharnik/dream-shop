import { Injectable } from '@angular/core';

const getWindow = (): Window => window;

@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  get nativeWindow(): Window {
    return getWindow();
  }
}
