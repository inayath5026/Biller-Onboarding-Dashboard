import { useState, useEffect } from "react";
import axios from "axios";
import "./AdditionalFinancialContactsForm.css";

interface AdditionalFinancialContactsFormData {
  title: string;
  fullName: string;
}

interface Props { billerId: string; formId: string }

export const AdditionalFinancialContactsForm: React.FC<Props> = ({ billerId, formId }) => {
  const [formData, setFormData] = useState<AdditionalFinancialContactsFormData>({
    title: "",
    fullName: ""
  });

  useEffect(() => {
    axios
      .get(`/api/forms/${formId}/financial-contacts?billerId=${billerId}`)
      .then(res => setFormData(res.data))
      .catch(() => console.log("No data yet"));
  }, [formId, billerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .post(`/api/forms/${formId}/financial-contacts`, { billerId, ...formData })
      .then(() => alert("Additional Financial Contact saved!"))
      .catch(() => alert("Error saving data"));
  };

  return (
    <div className="financial-form">
      <h3>Additional Financial Contacts</h3>

      <div className="info-box">
        <strong>Additional Financial Contacts</strong>
        <p>All fields in this section are required. Please provide complete information for additional financial contacts.</p>
      </div>

      <form>
        <div className="half-width">
          <label>Title <span className="required">*</span></label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
        </div>

        <div className="half-width">
          <label>Full Name <span className="required">*</span></label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleSave}>Save and Next</button>
        </div>
      </form>
    </div>
  );
};