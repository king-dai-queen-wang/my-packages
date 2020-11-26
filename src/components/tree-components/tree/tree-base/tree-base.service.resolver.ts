import { InjectionToken } from '@angular/core';
import {TreeBaseService} from './tree-base.service';

export const TreeHigherOrderServiceToken = new InjectionToken<TreeBaseService>('TreeHigherOrder');
