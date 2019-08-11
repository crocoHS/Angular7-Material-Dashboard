import { DebounceClickDirective } from './debounce-click.directive';

describe('DebounceClickDirective', () => {
  it('should create an instance', () => {
    const directive = new DebounceClickDirective('browser');
    expect(directive).toBeTruthy();
  });
});
