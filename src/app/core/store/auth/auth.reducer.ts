import { Action } from '@ngrx/store';
import { IUser } from '../../../shared/models/user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';


export interface AuthState {
    loggedIn: boolean;
    user: IUser;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    user: undefined
};

export function reducer( state = initialAuthState, action: AuthActions ): AuthState {
    switch ( action.type ) {
        case AuthActionTypes.LoginAction:
            return {
                loggedIn: true,
                user: action.payload.user
            };
        case AuthActionTypes.LogoutAction:
            return {
                loggedIn: false,
                user: undefined
            };
        default:
            return state;
    }
}
