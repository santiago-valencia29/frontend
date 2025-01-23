import * as fromUser from '../actions/user.actions';

export interface UserState {
  action: string;
}

const estadoInicial: UserState = {
  action: null
};

export function userReducer(state = estadoInicial, action: fromUser.accionesUser): UserState {

  switch (action.type) {

    case fromUser.SET_USER_ACTION:
      return {
        action: action.action
      };

    case fromUser.UNSET_USER_ACTION:
      return {
        action: null
      };


    default:
      return state;
  }
}
