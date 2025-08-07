// src/pages/Dashboard.tsx
import { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { StepPanel } from "../StepPanel/StepPanel";
import "./Dashboard.css";

export default function Dashboard() {
  const steps = ["W-9 & Basic Information", "OFAC Questionnaire", "Invoice Details", "Sign Documents"];
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleStepComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="app-container">
      <Sidebar steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
      <StepPanel currentStep={currentStep} onStepComplete={handleStepComplete} onBackStep={handleBackStep} />
    </div>
  );
}
