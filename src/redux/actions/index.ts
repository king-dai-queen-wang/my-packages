import {combineEpics, createEpicMiddleware} from "redux-observable";
import {fetchUserEpic} from "./user/user-actions";

export const epicMiddleware = createEpicMiddleware();
export const rootEpic = combineEpics(fetchUserEpic);

