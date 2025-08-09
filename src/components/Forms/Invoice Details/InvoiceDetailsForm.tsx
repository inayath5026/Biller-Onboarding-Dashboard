import React, { useState, useRef } from "react";
import "./InvoiceDetailsForm.css";

export const InvoiceDetailsForm: React.FC = () => {
  const [invoicePrefix, setInvoicePrefix] = useState("INV-");
  const [paymentTerms, setPaymentTerms] = useState("");

  const [bankLetterFile, setBankLetterFile] = useState<File | null>(null);
  const [voidedCheckFile, setVoidedCheckFile] = useState<File | null>(null);
  const [monthlyBankLetterFile, setMonthlyBankLetterFile] = useState<File | null>(null);
  const [monthlyVoidedCheckFile, setMonthlyVoidedCheckFile] = useState<File | null>(null);

  const bankLetterInputRef = useRef<HTMLInputElement>(null);
  const voidedCheckInputRef = useRef<HTMLInputElement>(null);
  const monthlyBankLetterInputRef = useRef<HTMLInputElement>(null);
  const monthlyVoidedCheckInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="idf-container">
      <h2 className="idf-title">Invoice Details</h2>
      <p className="idf-subtitle">Set up invoice preferences</p>

      {/* Basic Invoice Configuration */}
      <div className="idf-section">
        <div className="idf-info-box idf-green">
          <strong>Invoice Configuration</strong>
          <p>
            Set up your invoice preferences and payment terms. You can modify
            these settings later in your account dashboard.
          </p>
        </div>

        <div className="idf-row">
          <div className="idf-field">
            <label>
              Invoice Prefix <span className="idf-required">*</span>
            </label>
            <input
              type="text"
              value={invoicePrefix}
              onChange={(e) => setInvoicePrefix(e.target.value)}
            />
            <small>
              This will appear at the beginning of all invoice numbers (e.g.,
              INV-001)
            </small>
          </div>

          <div className="idf-field">
            <label>Payment Terms</label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            >
              <option value="">Select payment terms</option>
              <option value="net15">Net 15</option>
              <option value="net30">Net 30</option>
              <option value="net45">Net 45</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoice Features */}
      <div className="idf-section">
        <div className="idf-feature">
          <strong>Automatic Payment Reminders</strong>
          <p>Send automated reminders to customers for overdue invoices</p>
        </div>

        <div className="idf-feature">
          <strong>Online Payment Processing</strong>
          <p>
            Allow customers to pay invoices online with credit cards or bank
            transfers
          </p>
        </div>

        <div className="idf-feature">
          <strong>Recurring Invoice Support</strong>
          <p>Create templates for recurring monthly or annual invoices</p>
        </div>
      </div>

      {/* Upload Fields */}
      <div className="idf-section">
        <div className="idf-info-box idf-blue">
          <strong>Upload Fields per Invoice Type</strong>
          <p>
            Please upload the required documents for standard invoice
            processing. Both documents are required to proceed.
          </p>
        </div>

        <div className="idf-upload-field">
          <label>
            Bank Letter <span className="idf-required">*</span>
          </label>
          <div className="idf-file-drop">
            <p>PDF, JPG, or PNG • Max 10MB</p>
            <button onClick={() => bankLetterInputRef.current?.click()}>
              {bankLetterFile ? bankLetterFile.name : "Select File"}
            </button>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              ref={bankLetterInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, setBankLetterFile)}
            />
          </div>
        </div>

        <div className="idf-upload-field">
          <label>
            Voided Check <span className="idf-required">*</span>
          </label>
          <div className="idf-file-drop">
            <p>PDF, JPG, or PNG • Max 10MB</p>
            <button onClick={() => voidedCheckInputRef.current?.click()}>
              {voidedCheckFile ? voidedCheckFile.name : "Select File"}
            </button>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              ref={voidedCheckInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, setVoidedCheckFile)}
            />
          </div>
        </div>
      </div>

      {/* Monthly Fee Invoice Setup */}
      <div className="idf-section">
        <div className="idf-info-box idf-purple">
          <strong>Monthly Fee Invoice Setup</strong>
          <p>
            Same upload fields and validations as Invoice Types. Both documents
            are required for monthly fee processing.
          </p>
        </div>

        <div className="idf-upload-field">
          <label>
            Bank Letter <span className="idf-required">*</span>
          </label>
          <div className="idf-file-drop">
            <p>PDF, JPG, or PNG • Max 10MB</p>
            <button onClick={() => monthlyBankLetterInputRef.current?.click()}>
              {monthlyBankLetterFile ? monthlyBankLetterFile.name : "Select File"}
            </button>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              ref={monthlyBankLetterInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, setMonthlyBankLetterFile)}
            />
          </div>
        </div>

        <div className="idf-upload-field">
          <label>
            Voided Check <span className="idf-required">*</span>
          </label>
          <div className="idf-file-drop">
            <p>PDF, JPG, or PNG • Max 10MB</p>
            <button onClick={() => monthlyVoidedCheckInputRef.current?.click()}>
              {monthlyVoidedCheckFile ? monthlyVoidedCheckFile.name : "Select File"}
            </button>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              ref={monthlyVoidedCheckInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, setMonthlyVoidedCheckFile)}
            />
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="idf-section idf-info-box idf-blue">
        <strong>Next Steps</strong>
        <p>Once you complete the setup, you'll be able to:</p>
        <ul>
          <li>Create and send professional invoices</li>
          <li>Process different invoice types automatically</li>
          <li>Generate financial reports</li>
          <li>Manage customer information</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="idf-buttons">
        <button className="idf-btn-light">Back</button>
        <button className="idf-btn-dark">Next</button>
      </div>
    </div>
  );
};
