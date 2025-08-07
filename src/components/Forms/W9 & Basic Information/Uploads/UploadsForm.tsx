import { useState } from "react";
import axios from "axios";
import "./UploadsForm.css";

interface DocumentUploadsFormData {
  w9Form: File | null;
  driverLicenseFront: File | null;
  driverLicenseBack: File | null;
}

interface Props { billerId: string; formId: string }

export const UploadsForm: React.FC<Props> = ({ billerId, formId }) => {
  const [formData, setFormData] = useState<DocumentUploadsFormData>({
    w9Form: null,
    driverLicenseFront: null,
    driverLicenseBack: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSave = async () => {
    const uploadData = new FormData();
    uploadData.append("billerId", billerId.toString());
    if (formData.w9Form) uploadData.append("w9Form", formData.w9Form);
    if (formData.driverLicenseFront) uploadData.append("driverLicenseFront", formData.driverLicenseFront);
    if (formData.driverLicenseBack) uploadData.append("driverLicenseBack", formData.driverLicenseBack);

    try {
      await axios.post(`/api/forms/${formId}/documents`, uploadData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Documents uploaded successfully!");
    } catch {
      alert("Error uploading documents");
    }
  };

  return (
    <div className="document-form">
      <h3>Uploads</h3>

      <div className="info-box success">
        <strong>Document Uploads</strong>
        <p>Upload the required documents. All document uploads are mandatory for completion.</p>
      </div>

      <div className="upload-section">
        <label>Upload W-9 Form (2024) <span className="required">*</span></label>
        <div className="upload-box">
          <input type="file" name="w9Form" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
          <p>JPG, PNG or PDF, file size no more than 10MB</p>
        </div>
      </div>

      <div className="upload-section">
        <label>Driver License (Front) <span className="required">*</span></label>
        <div className="upload-box">
          <input type="file" name="driverLicenseFront" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
          <p>JPG, PNG or PDF, file size no more than 10MB</p>
        </div>
      </div>

      <div className="upload-section">
        <label>Driver License (Back) <span className="required">*</span></label>
        <div className="upload-box">
          <input type="file" name="driverLicenseBack" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
          <p>JPG, PNG or PDF, file size no more than 10MB</p>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleSave}>Save and Next</button>
      </div>
    </div>
  );
};
