import "./VideoAnalysis.css";
import faceIcon from "../../assets/form-assets/face.svg";
import videoIcon from "../../assets/form-assets/video.svg";
import footPrintIcon from "../../assets/form-assets/foot-print.svg";
import { useNavigate } from "react-router-dom";
import importIcon from "../../assets/form-assets/import-icon.svg";
import PopupUploadFile from "./PopupUploadFile";
import { useState } from "react";
import PopupUploadOrRecord from "./PopupUploadOrRecord";
import PopupAudioDropzone from "./PopupAudioDropzone";
import AudioAnalysisResult from "./AudioAnalysisResult";

const industryOptions = [
  { value: 3, label: "Loan Default" },
  { value: 4, label: "Fraud Detection" },
  { value: 5, label: "Debt Repayment Probability" },
  { value: 6, label: "Mental Wellness" },
  { value: 7, label: "Employee Churn" },
  { value: 8, label: "Candidate Success in General" },
  { value: 9, label: "Candidate in Construction" },
  { value: 10, label: "Candidate in Management" },
  { value: 11, label: "Candidate in Programming" },
  { value: 12, label: "Candidate in Sales and Marketing" },
  { value: 13, label: "Candidate in Sales" },
  { value: 14, label: "Candidate in Marketing" },
  { value: 15, label: "Candidate in AI Content" },
  { value: 16, label: "Candidate in Legal Finance" },
  { value: 17, label: "Candidate in Design" },
  { value: 18, label: "Candidate in Accounting" },
  { value: 19, label: "Candidate in Recruitment" },
  { value: 20, label: "Candidate in Operations" },
  { value: 21, label: "Candidate in Customer Service" },
  { value: 22, label: "Candidate in Technical Support" },
  { value: 23, label: "Candidate in Telesales" },
  { value: 24, label: "Candidate in Merchant Acquisition" },
];

const VideoAnalysis = () => {
  const navigate = useNavigate();
  const [openUploadPopup, setOpenUploadPopup] = useState(false);
  const [openUploadOrRecord, setOpenUploadOrRecord] = useState(false);
  const [openAudioDropzone, setOpenAudioDropzone] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(
    industryOptions[0]?.value || "",
  );
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="video-analysis-root">
      <header className="video-analysis-header">
        <h1 className="video-analysis-title">
          TEST OUR{" "}
          <span className="blue">
            PRE-BUILT BEHAVIOR
            <br />
            MODULES
          </span>{" "}
          FOR YOURSELF
        </h1>
        <p className="video-analysis-subtitle">
          Our integrated behavior modules enable you to get started immediately.
          Try it for yourself.
        </p>
      </header>
      <div className="video-analysis-card-row">
        <div
          className="video-analysis-card"
          onClick={() => navigate("/insights-form/face-analysis")}
        >
          <img
            src={faceIcon}
            alt="Face Scan"
            className="video-analysis-card-icon"
          />
          <div className="video-analysis-card-title">Face Scan Analysis</div>
        </div>
        <div
          className="video-analysis-card"
          onClick={() => navigate("/insights-form/video-analysis")}
        >
          <img
            src={videoIcon}
            alt="Voice"
            className="video-analysis-card-icon"
          />
          <div className="video-analysis-card-title">Voice Analysis</div>
        </div>
        <div
          className="video-analysis-card"
          onClick={() => navigate("/insights-form/digital-footprint")}
        >
          <img
            src={footPrintIcon}
            alt="Digital Footprint"
            className="video-analysis-card-icon"
          />
          <div className="video-analysis-card-title">Digital Footprint</div>
        </div>
      </div>
      <section className="video-analysis-section">
        <div className="video-analysis-section-title">
          <h2>VOICE ANALYSIS</h2>
          <p>
            Our pre-built voice module, trained on over hundreds of thousands
            voice samples is used by banks, insurance companies and employers to
            model fraud detection, job suitability and repayment intent.
          </p>
        </div>

        <div
          className="video-analysis-upload"
          onClick={() => setOpenUploadPopup(true)}
        >
          <img
            src={importIcon}
            alt="Upload"
            className="video-analysis-upload-icon"
          />
          <div className="video-analysis-upload-text">
            Record Now or Upload Audio
          </div>
        </div>
        <PopupUploadFile
          open={openUploadPopup}
          onClose={() => setOpenUploadPopup(false)}
          onAgree={() => {
            setOpenUploadPopup(false);
            setOpenUploadOrRecord(true);
          }}
        />
        <PopupUploadOrRecord
          open={openUploadOrRecord}
          onClose={() => setOpenUploadOrRecord(false)}
          selectedIndustry={selectedIndustry}
          onUploadAudio={() => {
            setOpenUploadOrRecord(false);
            setOpenAudioDropzone(true);
          }}
          onAnalysisComplete={(result) => {
            setAnalysisResult(result);
            setOpenUploadOrRecord(false);
          }}
        />
        <PopupAudioDropzone
          open={openAudioDropzone}
          onClose={() => setOpenAudioDropzone(false)}
          industryOptions={industryOptions}
          selectedIndustry={selectedIndustry}
          onAnalysisComplete={(result) => {
            setAnalysisResult(result);
            setOpenAudioDropzone(false);
          }}
        />

        <div className="video-analysis-industry">
          <div className="video-analysis-industry-label">
            Choose your industry
          </div>
          <select
            className="video-analysis-industry-select"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            {industryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>
      {analysisResult && (
        <AudioAnalysisResult
          result={analysisResult}
          industryOptions={industryOptions}
        />
      )}
    </div>
  );
};

export default VideoAnalysis;
