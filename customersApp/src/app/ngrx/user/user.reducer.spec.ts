import { userReducer, initialState, UserState } from "./user.reducer";
import { UserActions } from "./user.actions";

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = userReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('loadUsers action', () => {
    it('should set loading to true', () => {
      const action = UserActions.loadUsers();
      const result = userReducer(initialState, action);
      expect(result.loading).toBe(true);
    });
  });
});
