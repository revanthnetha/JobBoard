import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import OtpInput from "../components/OtpInput";
import icons from "../assets/index";
import { companyRegistrationSchema } from "../../../common/types/company-info";
import z from "zod";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { personIcon, mail, phone, groups } = icons;

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

  const handleSubmit = async (e: React.FormEvent) => {
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
        const res = await axios.post(`${BACKEND_URL}company/register`, {
          name: formData.name,
          phoneNo: formData.phoneNo,
          companyName: formData.companyName,
          companyEmail: formData.companyEmail,
          companySize: Number(formData.companySize),
        });
        console.log(res.data);
        setCurrentStep(1);
        toast({
          title: "Registration successful!",
          description: "Please verify OTP sent to your email and phone.",
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

  const verifyEmailOtp = async () => {
    const res = await axios.post(`${BACKEND_URL}company/verify-email`, {
      companyEmail: formData.companyEmail,
      otp: otpData.emailOtp,
    });
    const token = res.data.token;
    if (token != null) {
      localStorage.setItem("jwtToken", `Bearer ${token}`);
    }
    console.log(res.data);
    if (res.status === 200) {
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

  const verifyPhoneOtp = async () => {
    const res = await axios.post(`${BACKEND_URL}company/verify-phone`, {
      phoneNo: formData.phoneNo,
      otp: otpData.phoneOtp,
    });
    const token = res.data.token;
    if (token != null) {
      localStorage.setItem("jwtToken", `Bearer ${token}`);
    }
    console.log(res.data);
    if (res.status === 200) {
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
    <div className="flex flex-col lg:flex-row justify-around items-center py-4 px-4 md:px-10 space-y-4 md:space-y-0 w-full h-full">
      <div className="flex flex-col justify-center w-full md:w-1/2 space-y-6 mb-10 lg:mb-0">
        <div className="font-[DM Sans] font-semibold text-[18px] md:text-[22px] text-[#292929B2] w-full md:w-[90%] lg:w-[80%] flex justify-center flex-col text-left">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley
        </div>
      </div>
      <Card className="w-full md:w-1/3 p-6">
        <div className="flex flex-col space-y-4">
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
              <div className="flex justify-center">
              <Button value="Proceed" handleSubmit={handleSubmit} />
              </div>
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
