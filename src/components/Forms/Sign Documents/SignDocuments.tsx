import React, { useState, useRef } from "react";
import "./SignDocuments.css";
import CreateSignature from "./CreateSignature/CreateSignature";

interface DocumentItem {
  id: number;
  title: string;
  description: string;
  required: boolean;
  status: "Pending" | "Signed";
}

export const SignDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 1,
      title: "Service Agreement",
      description:
        "Main service agreement outlining terms of service and responsibilities",
      required: true,
      status: "Pending",
    },
    {
      id: 2,
      title: "Terms and Conditions",
      description: "General terms and conditions for using InvoiceCloud services",
      required: true,
      status: "Pending",
    },
    {
      id: 3,
      title: "Privacy Policy Agreement",
      description: "Data privacy and protection policy acknowledgment",
      required: true,
      status: "Pending",
    },
    {
      id: 4,
      title: "Compliance Certificate",
      description: "Regulatory compliance and certification requirements",
      required: true,
      status: "Pending",
    },
  ]);

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalDocs = documents.length;
  const signedDocs = documents.filter((d) => d.status === "Signed").length;
  const progressPercent = Math.round((signedDocs / totalDocs) * 100);

  const handleSignDocument = (id: number) => {
    if (!signatureData) {
      alert("Please create or upload your signature before signing documents.");
      return;
    }
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, status: "Signed" } : doc
      )
    );
  };

  const handleUploadSignature = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureData(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file (PNG, JPG, JPEG).");
    }
  };

  return (
    <div className="sd-wrapper">
      <div className="sd-container">
        <h2 className="sd-title">Sign Documents</h2>
        <p className="sd-subtitle">
          Please review and sign all required documents to complete your onboarding.
        </p>

        {/* Signature Management */}
        <div className="sd-signature-box">
          <h4 className="sd-signature-title">Signature Management</h4>
          <p className="sd-signature-text">
            Create or upload your signature once and use it for all documents.
          </p>
          <div className="sd-signature-actions">
            <button
              className="sd-btn-primary"
              onClick={() => setShowSignatureModal(true)}
            >
              + Create New Signature
            </button>
            <button className="sd-btn-outline" onClick={handleUploadSignature}>
              Upload Signature
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {signatureData && (
            <div className="sd-signature-preview">
              <p>Current Signature:</p>
              <div className="sd-signature-preview-box" aria-hidden={false}>
                <img
                  src={signatureData}
                  alt="User signature"
                  className="cs-uploaded-preview"
                />
              </div>
            </div>
          ) }
        </div>

        {/* Progress */}
        <div className="sd-progress-box">
          <span>Document Signing Progress</span>
          <span className="sd-progress-count">
            {signedDocs} of {totalDocs} documents signed
          </span>
          <span className="sd-progress-percent">{progressPercent}% Complete</span>
        </div>

        {/* Documents */}
        <div className="sd-documents-list">
          {documents.map((doc) => (
            <div key={doc.id} className="sd-doc-item">
              <div className="sd-doc-info">
                <div className="sd-doc-icon">🕒</div>
                <div>
                  <h5 className="sd-doc-title">{doc.title}</h5>
                  <p className="sd-doc-desc">{doc.description}</p>
                </div>
              </div>
              <div className="sd-doc-actions">
                <button className="sd-btn-outline">Preview Document</button>
                <button
                  className="sd-btn-primary"
                  onClick={() => handleSignDocument(doc.id)}
                  disabled={doc.status === "Signed"}
                >
                  {doc.status === "Signed" ? "Signed" : "Sign Document"}
                </button>
                {doc.required && <span className="sd-doc-required">Required</span>}
                <span className="sd-doc-status">{doc.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sd-footer">
          <button className="sd-btn-outline">Back</button>
          <div className="sd-footer-right">
            <button className="sd-btn-outline">Save</button>
            <button className="sd-btn-primary" disabled={signedDocs !== totalDocs}>
              Complete Onboarding
            </button>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <CreateSignature
          onSave={(dataUrl) => {
            // update preview instantly
            setSignatureData(dataUrl);
            // close modal after setting state
            setShowSignatureModal(false);
          }}
          onClose={() => setShowSignatureModal(false)}
        />
      )}
    </div>
  );
};

export default SignDocuments;