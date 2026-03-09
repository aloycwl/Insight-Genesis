import { useEffect, useState } from "react";
import "./PopupAudioRecorder.css";

const PopupAudioRecorder = ({
  open,
  onClose,
  selectedIndustry,
  onAnalysisComplete,
}) => {
  const [seconds, setSeconds] = useState(45);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!open) return;

    setSeconds(45);
    setFinished(false);

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);

    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }),
        recorder = new MediaRecorder(stream),
        chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const f = new FormData();
        f.append("audio", new Blob(chunks, { type: "audio/webm" }), "v");
        f.append("v", selectedIndustry || "");
        f.append("a", localStorage.getItem("a") || "");

        const text = await (
          await fetch("https://api.insightgenesis.ai/v", {
            method: "POST",
            body: f,
            headers: { auth: "c5UqVPihwtydCKe57YJPtpyE2ryB9AJn" },
          })
        ).text();
        if (onAnalysisComplete) onAnalysisComplete(JSON.parse(text));
        onClose();
      };

      recorder.start();

      setTimeout(() => {
        recorder.stop();
        stream.getTracks().forEach((t) => t.stop());
      }, 45e3);
    };

    startRecording();

    return () => clearInterval(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div className="popup-recorder-overlay" onClick={onClose}>
      <div
        className="popup-recorder-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-recorder-close" onClick={onClose}>
          &times;
        </button>

        <h2 className="popup-recorder-title">Voice Recording</h2>

        <div className="recorder-content">
          {!finished ? (
            <p>Start talking now, {seconds}s left</p>
          ) : (
            <p>Processing...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupAudioRecorder;
