import { useState, useEffect } from "react";
import axios from "axios";
import "./SignatoryContactForm.css";

interface SignatoryContactFormData {
  title: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
}

interface Props { customerId: string; formId: string }

export const SignatoryContactForm: React.FC<Props> = ({ customerId, formId }) => {
  const [formData, setFormData] = useState<SignatoryContactFormData>({
    title: "",
    fullName: "",
    dateOfBirth: "",
    email: ""
  });

  useEffect(() => {
    axios
      .get(`/api/forms/${formId}/signatory?customerId=${customerId}`)
      .then(res => setFormData(res.data))
      .catch(() => console.log("No data yet"));
  }, [formId, customerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .post(`/api/forms/${formId}/signatory`, { customerId, ...formData })
      .then(() => alert("Signatory Contact Info saved!"))
      .catch(() => alert("Error saving data"));
  };

  return (
    <div className="signatory-form">
      <h3>Signatory Contact Info</h3>
      <form>
        <div className="half-width">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
        </div>

        <div className="half-width">
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
        </div>

        <div className="full-width">
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>

        <div className="full-width">
          <label>Unique Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter unique email address" />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleSave}>Save and Next</button>
        </div>
      </form>
    </div>
  );
};