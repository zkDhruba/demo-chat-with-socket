import { createAction, props } from "@ngrx/store";
import { Usredata } from "src/app/models/user.model";

export const setUsername = createAction(
    '[User] Set Username',
    props<{ payload: Usredata }>()
);