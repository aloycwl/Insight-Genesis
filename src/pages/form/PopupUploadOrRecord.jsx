import { useState } from "react";
import "./PopupUploadOrRecord.css";
import PopupAudioRecorder from "./PopupAudioRecorder";

const PopupUploadOrRecord = ({
  open,
  onClose,
  onUploadAudio,
  selectedIndustry,
  onAnalysisComplete,
}) => {
  const [showRecorder, setShowRecorder] = useState(false);

  const handleStartRecording = () => {
    setShowRecorder(true);
  };

  const handleCloseRecorder = () => {
    setShowRecorder(false);
  };

  if (!open) return null;

  return (
    <>
      <div className="popup-upload-overlay" onClick={onClose}>
        <div
          className="popup-upload-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="popup-upload-close" onClick={onClose}>
            &times;
          </button>
          <h2 className="popup-upload-title">UPLOAD FILE</h2>
          <div className="popup-uploadorrecord-row">
            <div className="popup-uploadorrecord-col popup-uploadorrecord-upload">
              <div className="popup-uploadorrecord-label">Upload</div>
              <div className="popup-uploadorrecord-desc">
                Submit a 1-5 minute voice file in AAC, AIFF, ALAC, FLAC, MP3,
                MP4, OGG, PCM, WAV or WMA format.
              </div>
              <button
                className="popup-uploadorrecord-btn"
                onClick={onUploadAudio}
              >
                <span className="popup-uploadorrecord-uploadicon">&#8682;</span>{" "}
                Upload Audio
              </button>
            </div>
            <div className="popup-uploadorrecord-col popup-uploadorrecord-record">
              <div className="popup-uploadorrecord-label">Record</div>
              <div className="popup-uploadorrecord-desc">
                Click to record your voice for a minimum of 45 seconds, you can
                talk about weather, your job, your family or anything else you
                like.
              </div>
              <button
                className="popup-uploadorrecord-btn"
                onClick={handleStartRecording}
              >
                <span className="popup-uploadorrecord-micicon">🎤</span> Start
                Recording
              </button>
            </div>
          </div>
        </div>
      </div>

      <PopupAudioRecorder
        open={showRecorder}
        onClose={handleCloseRecorder}
        selectedIndustry={selectedIndustry}
        onAnalysisComplete={onAnalysisComplete}
      />
    </>
  );
};

export default PopupUploadOrRecord;
