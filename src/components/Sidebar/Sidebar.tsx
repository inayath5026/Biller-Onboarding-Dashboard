import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  steps: string[];
  currentStep: number;
  onStepChange: (index: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Onboarding Steps</h2>
      <ul className="sidebar-list">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`sidebar-item ${index === currentStep ? "active" : ""}`}
            onClick={() => onStepChange(index)}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};
