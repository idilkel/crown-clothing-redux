import { createContext, useEffect, useState } from "react";

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

//Provider - the actual component FC
//Will wrap any other component which needs access to the values inside
//children = the access requiring component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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
