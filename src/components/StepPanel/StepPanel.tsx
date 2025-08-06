import React from "react";
import { Panel1 } from "../panels/Panel1";
import "./StepPanel.css";

interface StepPanelProps {
    currentStep: number
}

export const StepPanel: React.FC<StepPanelProps> = ({ currentStep }) => {
    return (
        <div className="step-panel">

            {(currentStep == 0) && <Panel1 />}

            <div className="step-buttons">
                <button className="btn btn-secondary">Back</button>
                <div>
                    <button className="btn btn-secondary">Save</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    );
};
