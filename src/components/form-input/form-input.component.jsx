import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  //if label exists render the label
  //className depends if it is filled or not
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;

// import "./form-input.styles.scss";

// const FormInput = ({ label, ...otherProps }) => {
//   //if label exists render the label
//   //className depends if it is filled or not
//   return (
//     <div className="group">
//       <input className="form-input" {...otherProps} />
//       {label && (
//         <label
//           className={`${
//             otherProps.value.length ? "shrink" : ""
//           } form-input-label`}
//         >
//           {" "}
//           {label}{" "}
//         </label>
//       )}
//     </div>
//   );
// };

// export default FormInput;
