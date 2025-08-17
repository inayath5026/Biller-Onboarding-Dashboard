import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./CreateSignature.css";

interface CreateSignatureProps {
  onClose: () => void;
  onSave: (signatureDataUrl: string) => void;
}

const CreateSignature: React.FC<CreateSignatureProps> = ({ onClose, onSave }) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const saveSignature = () => {
    // guard - ensure ref exists and not empty
    if (!sigCanvas.current) {
      alert("Signature pad is not ready. Try again.");
      return;
    }

    // isEmpty() is provided by the underlying signaturePad API
    if ((sigCanvas.current as any).isEmpty && (sigCanvas.current as any).isEmpty()) {
      alert("Please draw your signature first!");
      return;
    }

    // Use getCanvas() to avoid returning a zero-sized trimmed canvas
    // add white background to make it visible on any page
    const canvas: HTMLCanvasElement | undefined = sigCanvas.current.getCanvas();
    if (!canvas) {
      alert("Could not get canvas from signature pad.");
      return;
    }

    // Create a temporary canvas to force a white background (prevents transparent PNGs
    // from looking 'blank' on white backgrounds and ensures exported image is visible)
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) {
      alert("Could not get canvas context.");
      return;
    }

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw the signature canvas onto the export canvas
    ctx.drawImage(canvas, 0, 0);

    // Convert to data URL
    const dataUrl = exportCanvas.toDataURL("image/png");
    onSave(dataUrl);
    // Parent will close the modal (so parent controls lifecycle)
  };

  return (
    <div className="cs-overlay" role="dialog" aria-modal="true">
      <div className="cs-modal">
        <h2 className="cs-title">Create Your Signature</h2>

        {/* Explicit width & height ensures exported image is sized predictably */}
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          clearOnResize={false}
          // You can tune width/height to your desired output ratio
          canvasProps={{ className: "cs-canvas", width: 700, height: 160 }}
        />

        <div className="cs-buttons">
          <button type="button" className="cs-btn" onClick={clearSignature}>
            Clear
          </button>
          <button type="button" className="cs-btn cs-save" onClick={saveSignature}>
            Save
          </button>
          <button type="button" className="cs-btn cs-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSignature;