import React, { useEffect, useState } from "react";
import "./BusinessInfoForm.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface BusinessInfoFormData {
  legalName: string;
  entityType: string;
  physicalAddress: string;
  dbaName: string;
  tin: string;
  officePhone: string;
  customerServicePhone: string;
  businessStartDate: string;
  fiscalYearEnd: string;
  websiteUrl: string;
}

interface Props {
  billerId: string;
  formId: string;
}

const BusinessInfoForm: React.FC<Props> = ({ billerId, formId }) => {
  const [formData, setFormData] = useState<BusinessInfoFormData>({
    legalName: "",
    entityType: "",
    physicalAddress: "",
    dbaName: "",
    tin: "",
    officePhone: "",
    customerServicePhone: "",
    businessStartDate: "",
    fiscalYearEnd: "",
    websiteUrl: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch saved data directly in component
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(
          `https://your-api-domain.com/api/forms/${formId}?billerId=${billerId}`
        );
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.error("Error fetching form data:", err);
      } finally {
        setLoading(false);
      }
    };
    //fetchForm();
  }, [billerId, formId]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save directly to API
const handleSave = async () => {
  try {
    // Generate GUID for ExternalId
    const externalId = uuidv4();

    // Hardcoded / default values for required fields
    const payload = {
      merchantId: 4321, // Assuming backend auto-generates or not used
      subscriberId: 123, // Hardcoded example Subscriber ID
      merchantDBA: formData.dbaName || "Default DBA",
      businessType: formData.entityType || "Retail",
      active: true,
      externalId: externalId,
      dateRecAdded: new Date().toISOString()
    };

    console.log("Saving merchant with payload:", payload);

    const res = await axios.post(
      "http://localhost:5140/api/v1/merchant",
      payload
    );

    alert(`Merchant created successfully! External ID: ${externalId}`);
    console.log("Response:", res.data);
  } catch (err) {
    console.error("Error saving merchant:", err);
    alert("Failed to create merchant.");
  }
};


  //if (loading) return <p>Loading...</p>;

  return (
    <div className="business-info-form">
  <h3>Business Information</h3>
  <form>
    <div className="half-width">
      <label>Legal Name</label>
      <input type="text" name="legalName" value={formData.legalName} onChange={handleChange} placeholder="Enter your legal business name" />
    </div>

    <div className="half-width">
      <label>Entity Type</label>
      <select name="entityType" value={formData.entityType} onChange={handleChange}>
        <option value="">Select entity type</option>
        <option value="LLC">LLC</option>
        <option value="Corporation">Corporation</option>
        <option value="Partnership">Partnership</option>
        <option value="Sole Proprietorship">Sole Proprietorship</option>
      </select>
    </div>

    <div className="full-width">
      <label>Physical Address</label>
      <input type="text" name="physicalAddress" value={formData.physicalAddress} onChange={handleChange} placeholder="Enter your business physical address" />
    </div>

    <div className="full-width">
      <label>DBA Name</label>
      <input type="text" name="dbaName" value={formData.dbaName} onChange={handleChange} placeholder="Doing Business As name" />
    </div>

    <div className="half-width">
      <label>TIN #</label>
      <input type="text" name="tin" value={formData.tin} onChange={handleChange} placeholder="Taxpayer Identification Number" />
    </div>

    <div className="half-width">
      <label>Office Phone</label>
      <input type="text" name="officePhone" value={formData.officePhone} onChange={handleChange} placeholder="(555) 123-4567" />
    </div>

    <div className="half-width">
      <label>Customer Service Phone</label>
      <input type="text" name="customerServicePhone" value={formData.customerServicePhone} onChange={handleChange} placeholder="(555) 123-4567" />
    </div>

    <div className="half-width">
      <label>Business Start Date</label>
      <input type="date" name="businessStartDate" value={formData.businessStartDate} onChange={handleChange} placeholder="dd-mm-yyyy" />
    </div>

    <div className="half-width">
      <label>Fiscal Year End</label>
      <input type="date" name="fiscalYearEnd" value={formData.fiscalYearEnd} onChange={handleChange} placeholder="dd-mm-yyyy" />
    </div>

    <div className="full-width">
      <label>Website URL</label>
      <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder="https://www.example.com" />
    </div>
  </form>

  <div className="form-actions">
    <button type="button" onClick={handleSave}>Save and Next</button>
  </div>
</div>


  );
};

export default BusinessInfoForm;