import React from "react";
import Input from "./Input";
import Button from "./button";

interface OtpInputProps {
  placeholder: string;
  name: string;
  value: string;
  verified: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  icon:string
}

const OtpInput: React.FC<OtpInputProps> = ({
  placeholder,
  name,
  value,
  verified,
  onChange,
  onVerify,
  icon
}) => {
  return (
    <div className="flex flex-col items-center">
      <Input
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        icon={icon}
        value={value}
        isVerify={verified}
      />
      {verified ? (
        ""
      ) : (
        <Button value={"Verify"} handleSubmit={onVerify}/>
      )}
    </div>
  );
};

export default OtpInput;
