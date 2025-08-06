import { useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { StepPanel } from "./components/StepPanel/StepPanel";
import "./App.css";

export default function App() {
  const steps = ["W-9 & Basic Information", "OFAC Questionnaire", "Invoice Details", "Sign Documents"];
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div className="app-container">
      <Sidebar steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
      <StepPanel currentStep={currentStep} />
    </div>
  );
}