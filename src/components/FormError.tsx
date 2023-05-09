import React from "react";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  errors: object;
  name: string;
};

function FormError({ errors, name }: Props) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p className="text-sm font-medium text-red-500" key={type}>
            {message}
          </p>
        ))
      }
    />
  );
}

export default FormError;
