import React from "react";
import Input from "./Input";
// import { CheckIcon } from "@heroicons/react/outline"; // For success icon

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
        <button
          onClick={onVerify}
          className="w-[310px] h-[40px] md:w-[532px] md:h-[43px] rounded-[7px] bg-[#0B66EF] text-white mt-2 text-[DM Sans] font-semibold text-[24px]"
        >
          Verify
        </button>
      )}
    </div>
  );
};

export default OtpInput;
