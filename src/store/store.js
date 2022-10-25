import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//import logger from "redux-logger";

//root-reducer- a combination of all the reducers
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistConfig = {
  key: "root", //persist all
  storage,
  blacklist: ["user"], //we don't want the user to persist because it's coming from AuthListener and they might conflict
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

//can replace the above lines
//const middleWares = [logger];

//Enhancer - to catch actions before they hit the reducers and it enables log-out the state
const composedEnhancers = compose(applyMiddleware(...middleWares));

//1. rootReducer - only must 2. optional: additional default state 3. optional: middleWares: library helpers which occur before the reducer (such as dispatch)
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
