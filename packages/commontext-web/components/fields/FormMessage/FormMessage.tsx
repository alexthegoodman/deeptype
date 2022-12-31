import * as React from "react";

import { FormMessageProps } from "./FormMessage.d";

const FormMessage: React.FC<FormMessageProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click FormMessage"),
  type = "",
  message = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <>
      {message !== "" ? (
        <section className={`formMessage ${type}`}>
          <div className="formMessageInner">
            <span className="messageContent">{message}</span>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormMessage;
