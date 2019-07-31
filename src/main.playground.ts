import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlaygroundModule } from 'angular-playground';
import { AppMaterialModule } from './app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

PlaygroundModule
  .configure({
    selector: 'app-root',
    overlay: false,
    modules: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule
    ],
  });

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
