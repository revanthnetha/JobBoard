import React, { useState } from "react";
import { z } from "zod";
import { jobSchema, jobRegistrationData } from "../../../common/types/job-info";
import Button from "../components/button";

const Dashboard = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [candidateEmails, setCandidateEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateInterviewClick = () => {
    setIsFormVisible(true);
  };

  const handleBackClick = () => {
    setIsFormVisible(false);
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newEmail) {
      e.preventDefault();
      const trimmedEmail = newEmail.trim();
      if (trimmedEmail) {
        setCandidateEmails((prev) => [...prev, trimmedEmail]);
        setNewEmail("");
      }
    }
  };

  const handleRemoveEmail = (email: string) => {
    setCandidateEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jobData: jobRegistrationData = {
      title: jobTitle,
      description: jobDescription,
      experienceLevel,
      candidates: candidateEmails,
      endDate,
    };

    try {
      jobSchema.parse(jobData);
      setErrors({});

      // Send data to the backend
      alert("Job created successfully!");
      setIsFormVisible(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col ml-16">
      {!isFormVisible ? (
        <Button
          value="Create Interview"
          handleSubmit={handleCreateInterviewClick}
        />
      ) : (
        <div className="bg-white p-6 rounded-lg mt-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <label className="text-black text-[DM Sans] font-semibold text-[22px] pl-24 w-1/4">
                Job Title:
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter Job Title"
                required
                className={`w-2/4 h-[50px] text-[#535353B2] border border-gray-300 px-3 py-2 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}

            <div className="mb-4 flex items-center">
              <label className="text-black text-[DM Sans] font-semibold text-[22px] pl-24 w-1/4">
                Job Description:
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter Job Description"
                required
                className={`w-2/4 h-[100px] text-[#535353B2] border border-gray-300 px-3 py-2 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}

            <div className="mb-4 flex items-center">
              <label className="text-black text-[DM Sans] font-semibold text-[22px] pl-24 w-1/4">
                Experience Level:
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                required
                className={`w-2/4 h-[50px] text-[#535353B2] border border-gray-300 px-3 py-2 ${
                  errors.experienceLevel ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
              >
                <option value="">Select Experience Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            {errors.experienceLevel && (
              <p className="text-red-500 text-sm">{errors.experienceLevel}</p>
            )}

            <div className="mb-4 flex items-center">
              <label className="text-black text-[DM Sans] font-semibold text-[22px] pl-24 w-1/4">
                Candidate Emails:
              </label>
              <div className="w-2/4 flex flex-wrap items-center border border-gray-300 rounded-lg px-3 py-2">
                {candidateEmails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center bg-gray-200 rounded-full px-2 py-1 m-1"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="ml-2 text-red-500"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={newEmail}
                  onChange={handleEmailInputChange}
                  onKeyDown={handleAddEmail}
                  placeholder="Enter an email"
                  className="border-none outline-none"
                />
              </div>
            </div>
            {errors.candidates && (
              <p className="text-red-500 text-sm">{errors.candidates}</p>
            )}

            <div className="mb-4 flex items-center">
              <label className="text-black text-[DM Sans] font-semibold text-[22px] pl-24 w-1/4">
                End Date:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className={`w-2/4 h-[50px] text-[#535353B2] border border-gray-300 px-3 py-2 ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
              />
            </div>
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate}</p>
            )}

            <div className="flex gap-2 justify-end mt-4 w-3/4">
              <button
                onClick={handleBackClick}
                className="w-[80px] h-[43px] rounded-[7px] bg-[#0B66EF] text-white mt-4"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-[80px] h-[43px] rounded-[7px] bg-[#0B66EF] text-white mt-4"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
