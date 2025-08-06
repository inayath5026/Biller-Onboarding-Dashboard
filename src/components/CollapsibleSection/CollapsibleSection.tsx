import { useState } from "react";
import "./CollapsibleSection.css";

interface CollapsibleSectionProps {
  title: string;
  children?: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-section">
      <button className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`chevron ${isOpen ? "rotate" : ""}`}>&#9662;</span>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
};
