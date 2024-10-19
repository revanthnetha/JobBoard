import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 
import Card from "../components/Card";
import OtpInput from "../components/OtpInput";
import icons from "../assets/index";
import { companyRegistrationSchema } from "../../../common/types/company-info";
import z from "zod";
import Input from "../components/Input";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { personIcon,mail,phone,groups } = icons;

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    companyName: "",
    companyEmail: "",
    companySize: "",
  });

  const [otpData, setOtpData] = useState({
    emailOtp: "",
    phoneOtp: "",
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentStep === 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setOtpData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle registration form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 0) {
      try {
        companyRegistrationSchema.parse({
          name: formData.name,
          phoneNo: Number(formData.phoneNo),
          companyName: formData.companyName,
          companyEmail: formData.companyEmail,
          companySize: Number(formData.companySize),
        });
        // Move to OTP step if validation passes
        setCurrentStep(1);
        toast({
          title: "Registration successful!",
          description: "Please verify your email and phone.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (err) {
        if (err instanceof z.ZodError) {
          toast({
            title: "Error in form submission",
            description: err.errors[0]?.message || "Validation error",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  // Handle email OTP verification
  const verifyEmailOtp = () => {
    if (otpData.emailOtp === "1234") { // Mock OTP validation
      setEmailVerified(true);
      toast({
        title: "Email verified successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid email OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle phone OTP verification
  const verifyPhoneOtp = () => {
    if (otpData.phoneOtp === "5678") { // Mock OTP validation
      setPhoneVerified(true);
      toast({
        title: "Phone verified successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid phone OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Redirect to dashboard if both OTPs are verified
  if (emailVerified && phoneVerified) {
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col md:flex-row justify-around align-center py-4">
      <div className="flex flex-col justify-center">
        <div className="font-[DM Sans] font-semibold text-[22px] text-[#292929B2] md:w-[622px] h-[116px] flex justify-center flex-col text-left">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley
        </div>
      </div>
      <Card>
        <div className="flex flex-col">
          {currentStep === 0 ? (
            <>
              <Input
                placeholder="Name"
                icon={personIcon}
                onChange={handleChange}
                name="name"
              />
              <Input
                placeholder="Phone no."
                icon={phone}
                type="number"
                onChange={handleChange}
                name="phoneNo"
              />
              <Input
                placeholder="Company Name"
                icon={personIcon}
                onChange={handleChange}
                name="companyName"
              />
              <Input
                placeholder="Company Email"
                icon={mail}
                onChange={handleChange}
                name="companyEmail"
              />
              <Input
                placeholder="Company Size"
                icon={groups}
                onChange={handleChange}
                name="companySize"
              />
              <button
                onClick={handleSubmit}
                className="md:w-[542px] h-[43px] rounded-[7px] bg-[#0B66EF] text-white mt-4"
              >
                Proceed
              </button>
            </>
          ) : (
            <>
              <OtpInput
                placeholder="Email OTP"
                name="emailOtp"
                value={otpData.emailOtp}
                verified={emailVerified}
                onChange={handleChange}
                onVerify={verifyEmailOtp}
                icon={mail}
              />
              <OtpInput
                placeholder="Mobile OTP"
                name="phoneOtp"
                value={otpData.phoneOtp}
                verified={phoneVerified}
                onChange={handleChange}
                onVerify={verifyPhoneOtp}
                icon={phone}
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Signup;
