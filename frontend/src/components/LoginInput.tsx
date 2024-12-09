import React, { ReactNode, useState } from "react";

// Define prop types for LoginInput component
interface LoginInputProps {
  htmlFor: string;
  label_name?: string;
  input_type: string;
  autoFocus?: boolean;
  value?: string;
  children?: ReactNode;
  update_on_change?: (value: string) => void;
  boolean_check?: boolean;
}

const LoginInput: React.FC<LoginInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine the input type (password or text based on toggle)
  const inputType =
    props.input_type === "password" && showPassword ? "text" : props.input_type;

  return (
    <div className="flex flex-col text-black text-sm mb-4">
      {/* Label */}
      <label className="text-sm mb-2" htmlFor={props.htmlFor}>
        {props.label_name
          ? props.label_name
          : props.input_type.charAt(0).toUpperCase() + props.input_type.slice(1)}
        :
      </label>

      {/* Input with optional toggle for password */}
      <div className="relative">
        <input
          className="border border-gray-300 outline-none p-[5px] pl-[12px] pr-[12px] bg-white text-black rounded-full text-sm leading-5 focus:border-blue-500 w-full"
          autoFocus={props.autoFocus || false}
          type={inputType}
          id={props.htmlFor}
          value={props.value}
          onChange={(e) => props.update_on_change && props.update_on_change(e.target.value)}
        />
        {/* Password Visibility Toggle */}
        {props.input_type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center text-gray-500 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {/* Validation Message */}
      <div className="text-red-700 mt-1 mb-4">
        {props.boolean_check ? "" : props.children}
      </div>
    </div>
  );
};

export default LoginInput;
