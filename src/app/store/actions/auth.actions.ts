import { Action } from '@ngrx/store';



export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';
export const USER_ACTION = '[Auth] Action User';


export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: {}) { }

}

export class UnsetUserAction implements Action {
    readonly type = UNSET_USER;

}


export type acciones = SetUserAction | UnsetUserAction ;
