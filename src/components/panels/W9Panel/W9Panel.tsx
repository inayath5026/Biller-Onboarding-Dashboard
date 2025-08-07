import React from "react";
import { CollapsibleSection } from "../../CollapsibleSection/CollapsibleSection";
import BusinessInfoForm from "../../Forms/W9 & Basic Information/Business Information/BusinessInfoForm";
import "./W9Panel.css";
import { SignatoryContactForm } from "../../Forms/W9 & Basic Information/Signatory Contact Info/SignatoryContactForm";
import { AdditionalFinancialContactsForm } from "../../Forms/W9 & Basic Information/Additional Financial Contacts/AdditionalFinancialContactsForm";
import { UploadsForm } from "../../Forms/W9 & Basic Information/Uploads/UploadsForm";

export const W9Panel: React.FC = () => {
  return (
    <div className="step-panel">
      <h1 className="step-title">W-9 & Basic Information</h1>
      <div className="step-alert">
        Complete your business information. All fields are required. You can save each section individually and
        navigate freely between sections.
      </div>

      <CollapsibleSection title="Business Information">
        <BusinessInfoForm billerId={"jhdch"} formId={"jbj"}/>
      </CollapsibleSection>

      <CollapsibleSection title="Signatory Contact Info">
        <SignatoryContactForm billerId={"Abcd"} formId={"xyz"} />
      </CollapsibleSection>

      <CollapsibleSection title="Additional Financial Contacts">
        <AdditionalFinancialContactsForm billerId={"Abcd"} formId={"xyz"}/>
      </CollapsibleSection>

      <CollapsibleSection title="Uploads">
        <UploadsForm billerId={"Abcd"} formId={"xyz"}/>
      </CollapsibleSection>
    </div>
  );
};
