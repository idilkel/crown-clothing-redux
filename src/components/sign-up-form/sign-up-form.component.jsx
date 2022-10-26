//import { signInWithEmailAndPassword } from "firebase/auth";
//useContext is not needed: We have the onAuthStateChangedListener instead
import { useState } from "react";

import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer, AlertMessage } from "./sign-up-form.styles";
import { useNavigate } from "react-router-dom";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [alertMsg, setAlertMsg] = useState("");
  //console.log(formFields);

  //We have the onAuthStateChangedListener instead
  //const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlertMsg("password confirmation doesn't match");
      //alert(`password confirmation doesn't match`);
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
      navigate("/shop");
      setAlertMsg("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setAlertMsg("Can't create a user, email already in use");
        //alert(`Can't create a user, email already in use`);
      } else {
        console.log("user creation encountered an error" + error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
      <AlertMessage>{alertMsg}</AlertMessage>
    </SignUpContainer>
  );
};

export default SignUpForm;

// <form onSubmit={handleSubmit}>
// <label>Display name</label>
// <input
//   type="text"
//   required
//   onChange={handleChange}
//   name="displayName"
//   value={displayName}
// />

// <label>Email</label>
// <input
//   type="email"
//   required
//   onChange={handleChange}
//   name="email"
//   value={email}
// />

// <label>Password</label>
// <input
//   type="password"
//   required
//   onChange={handleChange}
//   name="password"
//   value={password}
// />

// <label>Confirm Password</label>
// <input
//   type="password"
//   required
//   onChange={handleChange}
//   name="confirmPassword"
//   value={confirmPassword}
// />
// <button type="submit">Sign Up</button>
// </form>
