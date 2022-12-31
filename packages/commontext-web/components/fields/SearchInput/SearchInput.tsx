import * as React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

import { SearchInputProps } from "./SearchInput.d";

const SearchInput: React.FC<SearchInputProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click SearchInput"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const onError = (error) => console.error(error);

  return (
    <section className="searchForm">
      <div className="searchFormInner">
        <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <input className="searchButton" type="submit" value="GO" />
          <FormInput
            type="search"
            name="search"
            placeholder="Search interests..."
            register={register}
            errors={errors}
            validation={{ required: false }}
          />
        </form>
      </div>
    </section>
  );
};

export default SearchInput;
