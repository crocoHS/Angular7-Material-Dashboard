import { reducer, initialAuthState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialAuthState, action);

      expect(result).toBe(initialAuthState);
    });
  });
});
