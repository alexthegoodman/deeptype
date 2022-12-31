import * as React from "react";
import { useFormContext } from "react-hook-form";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage";

import { FormUploadProps } from "./FormUpload.d";

const FormUpload: React.FC<FormUploadProps> = ({
  validation = {},
  errors = null,
  register = null,
  ...fieldProps
}) => {
  // NOTE: requires <FormProvider />
  const { register: contextRegister, setValue, getValues } = useFormContext();
  const { name } = fieldProps;

  // const currentValues = getValues();

  const fileNameField = name + "Name";
  const fileSizeField = name + "Size";
  const fileTypeField = name + "Type";
  const fileDataField = name + "Data";

  React.useEffect(() => {
    contextRegister(fileSizeField);
    contextRegister(fileTypeField);
    contextRegister(fileDataField);
  }, [name]);

  const onFileInputChange = (e) => {
    const file = e.target["files"][0];
    const reader = new FileReader();

    setValue(fileNameField, file.name);
    setValue(fileSizeField, file.size);
    setValue(fileTypeField, file.type);

    reader.onload = function (item) {
      const base64 = item?.target?.result as string;
      setValue(fileDataField, base64);

      console.info("reader.onload form values", getValues());
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="formUpload">
      {fieldProps.placeholder !== "" ? (
        <label>{fieldProps.placeholder}</label>
      ) : (
        <></>
      )}
      <input
        type="file"
        {...fieldProps}
        {...register(fieldProps.name, validation)}
        onChange={onFileInputChange}
      />
      <SimpleErrorMessage errors={errors} fieldProps={fieldProps} />
    </div>
  );
};

export default FormUpload;
