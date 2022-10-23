import { createContext, useEffect, useState, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//The actual storage itself with the actual value to access
export const UserContext = createContext({
  currentUser: null,
  //empty function
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  console.log("dispatched");
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type}` in userReducer);
  }
};

const INITIAL_STATE = { currentUser: null };

//Provider - the actual component FC
//Will wrap any other component which needs access to the values inside
//children = the access requiring component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  console.log(currentUser);

  //user can be null or auth object
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        //create the userDocument if a user comes threw
        createUserDocumentFromAuth(user);
      }
      //console.log(user); //null when logged out or full user when logged in
      setCurrentUser(user);
    });

    //unmount
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
