import React, { InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";

import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  wthatsapp?: boolean;
  cost?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  wthatsapp,
  cost,
  ...rest
}) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      {wthatsapp && (
        <InputMask
          mask="(99)999999999"
          maskChar=""
          type="text"
          id={name}
          {...rest}
        />
      )}
      {cost && (
        <InputMask
          mask="9999.99"
          maskChar=" "
          type="text"
          id={name}
          {...rest}
        />
      )}
      {!cost && !wthatsapp && <input type="text" id={name} {...rest} />}
    </div>
  );
};

export default Input;
