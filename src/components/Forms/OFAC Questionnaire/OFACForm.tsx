import React from 'react';
import './OFACForm.css';

const questions = [
  {
    id: 1,
    text: "Have a physical presence in a Comprehensively Sanctioned Jurisdiction or in any Targeted Sanctioned Jurisdiction?",
  },
  {
    id: 2,
    text: "Conduct or plan to conduct business activity in, or with counterparties located in, a Comprehensively Sanctioned Jurisdiction and/or with a Sanctioned Party?",
  },
  {
    id: 3,
    text: "Conduct or plan to conduct business activity in, or with counterparties located in, a Targeted Sanctioned Jurisdiction?",
  },
  {
    id: 4,
    text: "Have a director, senior officer, or 10% or greater owner or shareholder who is any of the following:",
    subText: (
      <ul>
        <li>a. A resident of a Comprehensively Sanctioned Jurisdiction or Targeted Sanctioned Jurisdiction</li>
        <li>b. A person employed by or representing a governmental agency or authority of a Comprehensively Sanctioned Jurisdiction or Targeted Sanctioned Jurisdiction</li>
        <li>c. A person who is a Sanctioned Party</li>
      </ul>
    )
  },
  {
    id: 5,
    text: "Import or export, directly or indirectly, any technology, electronic or other components, and/or manufacturing equipment for the production thereof (including any related services), identified by the U.S., the EU and the UK as Russia-related Common High Priority Items that pose a heightened risk of export control evasion/circumvention?"
  },
  {
    id: 6,
    text: "Within the past 10 years, has the customer filed a voluntary self-disclosure with OFAC or made an equivalent sanctions-related or export-related notification to a relevant authority, become the subject of an administrative subpoena or of a sanctions-related or export-related enforcement action, or have any open or ongoing internal or external sanctions-related or export-related investigation?"
  },
  {
    id: 7,
    text: "Are there any other sanctions risks identified regarding the customer (e.g., other sanctions activity not documented above or recently ceased activity in a sanctioned jurisdiction)?"
  }
];

export const OFACForm: React.FC = () => {
  return (
    <div className="ofac-container">
      <div className="ofac-panel">
        <h2 className="ofac-heading">OFAC Questionnaire</h2>
        <p className="ofac-subheading">Complete compliance screening</p>

        <div className="ofac-warning">
          <strong>OFAC Questionnaire</strong><br />
          Please answer the following questions regarding sanctions compliance. You can navigate freely between steps, but all questions must be answered before final submission.
        </div>

        {questions.map(q => (
          <div className="ofac-question" key={q.id}>
            <div className="ofac-question-text">
              <span>{q.id}. {q.text}</span>
              {q.subText && <div className="ofac-sub-text">{q.subText}</div>}
            </div>
            <div className="ofac-radio-group">
              <label><input type="radio" name={`q${q.id}`} /> Yes</label>
              <label><input type="radio" name={`q${q.id}`} /> No</label>
            </div>
          </div>
        ))}

        <div className="ofac-notice">
          <strong>Important Notice</strong><br />
          Providing false or misleading information regarding sanctions compliance may result in serious legal consequences. If you have any doubts about how to answer these questions, please consult with your legal counsel before proceeding.
        </div>

        <div className="ofac-actions">
          <button className="ofac-btn ofac-btn-secondary">Back</button>
          <button className="ofac-btn ofac-btn-primary">Next</button>
        </div>
      </div>
    </div>
  );
};
