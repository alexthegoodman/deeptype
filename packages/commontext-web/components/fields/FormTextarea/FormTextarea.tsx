import * as React from "react";

import { FormTextareaProps } from "./FormTextarea.d";

const FormTextarea: React.FC<FormTextareaProps> = ({
  validation = {},
  errors = null,
  register = null,
  ...fieldProps
}) => {
  return (
    <div className="formTextarea">
      <textarea {...fieldProps} {...register(fieldProps.name, validation)} />
      {errors !== null && errors[fieldProps.name] ? (
        <span>Message is required.</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormTextarea;
