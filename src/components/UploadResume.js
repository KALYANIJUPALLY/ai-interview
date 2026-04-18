import React from "react";
import { extractTextFromPDF } from "../utils/pdfParser";

const UploadResume = ({ setResumeText }) => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const text = await extractTextFromPDF(file);
    setResumeText(text);
  };

  return <input type="file" onChange={handleUpload} />;
};

export default UploadResume;