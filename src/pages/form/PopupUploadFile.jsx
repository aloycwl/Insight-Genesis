import './PopupUploadFile.css';

const PopupUploadFile = ({ open, onClose, onAgree }) => {
  if (!open) return null;
  return (
    <div className="popup-upload-overlay" onClick={onClose}>
      <div className="popup-upload-modal" onClick={e => e.stopPropagation()}>
        <button className="popup-upload-close" onClick={onClose}>&times;</button>
        <h2 className="popup-upload-title">UPLOAD FILE</h2>
        <div className="popup-upload-content">
          <p className="popup-upload-subtitle"><b>Before uploading, here's what you need to know:</b></p>
          <ul className="popup-upload-list">
            <li><span className="dot" />Please ensure that you either own the copyright for any audio files you upload, or that you have obtained the necessary permissions to share them on Insight Genesis AI.</li>
            <li><span className="dot" />Minimum upload length is <b>1 minute</b>.</li>
            <li><span className="dot" />Maximum upload length is <b>5 minutes</b>.</li>
            <li><span className="dot" />Accepted file formats: AAC, AIFF, ALAC, FLAC, MP3, MP4, OGG, PCM, WAV, or WMA.</li>
          </ul>
          <p className="popup-upload-terms">
            By clicking 'Agree and upload', you agree to the Insight Genesis AI's <a href="#" className="popup-upload-link">Terms of Service</a> and <a href="#" className="popup-upload-link">Privacy Policy</a>.
          </p>
        </div>
        <button className="popup-upload-agree" onClick={onAgree}>Agree and upload</button>
      </div>
    </div>
  );
};

export default PopupUploadFile; 