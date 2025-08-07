import React from "react";
import { W9Panel } from "../panels/W9Panel/W9Panel";
import "./StepPanel.css";
import { OFACPanel } from "../panels/OFACPanel/OFACPanel";

interface StepPanelProps {
    currentStep: number,
    onStepComplete: () => void,
    onBackStep: () => void
}

export const StepPanel: React.FC<StepPanelProps> = ({ currentStep, onStepComplete, onBackStep }) => {
    return (
        <div className="step-panel">

            {(currentStep == 0) && <W9Panel />}
            {(currentStep == 1) && <OFACPanel />}

            <div className="step-buttons">
                <button className="btn btn-secondary" onClick={onBackStep}>Back</button>
                <div>
                    <button className="btn btn-secondary">Save</button>
                    <button className="btn btn-primary" onClick={onStepComplete}>Next</button>
                </div>
            </div>
        </div>
    );
};
