import { Action } from '@ngrx/store';



export const UNSET_USER_ACTION = '[Action] Unset User';
export const SET_USER_ACTION = '[Action] Action User';


export class ActionSetUserAction implements Action {
    readonly type = SET_USER_ACTION;

    constructor(public action: string) { }

}

export class ActionUnsetUser implements Action {
    readonly type = UNSET_USER_ACTION;

}


export type accionesUser = ActionSetUserAction | ActionUnsetUser ;
