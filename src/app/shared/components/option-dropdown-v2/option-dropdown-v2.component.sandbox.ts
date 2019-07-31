import { sandboxOf } from 'angular-playground';
import { OptionDropdownV2Component } from './option-dropdown-v2.component';

export default sandboxOf(OptionDropdownV2Component)
  .add('default', {
    template: `<app-option-dropdown-v2></app-option-dropdown-v2>`
  });
