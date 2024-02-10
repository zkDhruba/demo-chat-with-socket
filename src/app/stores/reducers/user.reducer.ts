import { createReducer, on } from "@ngrx/store";
import { Usredata } from "src/app/models/user.model";
import { setUsername } from "../actions/user.action";

export const initialState: Usredata = {
    username: '',
    phone: ''
}

export const userReducer = createReducer(
    initialState,
    on(setUsername, (state, { payload }) => ({
        ...state,
        userData: payload
    }))
)