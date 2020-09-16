import {ofType} from "redux-observable";
import {map, mergeMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {UserActionEnum} from "../../enum/users/user-action.enum";

export const fetchUser = username => ({ type: UserActionEnum.FETCH_USER, payload: username });
const fetchUserFulfilled = payload => ({ type: UserActionEnum.FETCH_USER_FULFILLED, payload });

export const fetchUserEpic = action$ => action$.pipe(
    ofType(UserActionEnum.FETCH_USER),
    mergeMap((action: any) =>
        ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
            map(response => fetchUserFulfilled(response))
        )
    )
);
