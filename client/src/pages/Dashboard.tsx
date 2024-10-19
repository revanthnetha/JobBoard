import React, { useState } from 'react';
import { z } from 'zod';
import { jobSchema, jobRegistrationData } from "../../../common/types/job-info"
import Button from '../components/button';

const Dashboard = () => {
  // State for form inputs
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('');
  const [candidateEmails, setCandidateEmails] = useState<string[]>([]);
  const [endDate, setEndDate] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({}); // To handle validation errors

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to handle form visibility
  const handleCreateInterviewClick = () => {
    setIsFormVisible(true); // Show form and disable button
  };

  // Function to handle form submission
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
      // Validate the jobData with Zod
      jobSchema.parse(jobData);

      // Clear any previous errors if validation is successful
      setErrors({});

      // Send data to the backend
      alert('Job created successfully!');
      setIsFormVisible(false); // Hide form after submission
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Capture and set validation errors
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex flex-col ml-16 min-h-screen">
      {!isFormVisible && (
        <Button value="Create Interview" handleSubmit={handleCreateInterviewClick} />
      )}

      {/* Show the form on the page when Create Interview is clicked */}
      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg  ml-12 mt-6">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-2">
              <label className="block text text-black">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder='Enter Job Title'
                required
                className={` text-[#535353B2] text-[DM Sans] border border-gray-300 px-3 py-2  ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="mb-4 flex gap-2">
              <label className="block text text-black">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder='Enter Job Description'
                required
                className={` text-[#535353B2] text-[DM Sans] border border-gray-300  px-3 py-2  ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="mb-4 flex gap-2">
              <label className="block text text-black">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                required
                className={` text-[#535353B2] text-[DM Sans] border border-gray-300  px-3 py-2  ${errors.experienceLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              >
                <option value="">Select Experience Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
              {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel}</p>}
            </div>

            <div className="mb-4 flex gap-2">
              <label className="block text">Candidate Emails</label>
              <input
                type="text"
                placeholder="Enter emails separated by commas"
                value={candidateEmails.join(', ')}
                onChange={(e) => setCandidateEmails(e.target.value.split(',').map((email) => email.trim()))}
                required
                className={` text-[#535353B2] text-[DM Sans] border border-gray-300  px-3 py-2  ${errors.candidates ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {errors.candidates && <p className="text-red-500 text-sm">{errors.candidates}</p>}
            </div>

            <div className="mb-4 flex gap-2">
              <label className="block text">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder='End Date'
                required
                className={` text-[#535353B2] text-[DM Sans] border border-gray-300  px-3 py-2  ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
            <div className='flex flex-end w-16'>
              <Button value="Create Job" handleSubmit={handleCreateInterviewClick} />
              </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
