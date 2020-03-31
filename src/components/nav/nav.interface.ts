import {Routes} from '@angular/router';

export interface NavInterface {
  name: string;
  url: string;
  icon: string;
  children: NavInterface[];
}
