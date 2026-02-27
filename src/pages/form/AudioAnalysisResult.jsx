import './AudioAnalysisResult.css';

const getRiskLevel = (score) => {
  if (score < 400) return { label: 'High risk', color: '#e23c3c' };
  if (score < 700) return { label: 'Medium risk', color: '#b6c800' };
  return { label: 'Low risk', color: '#1ec773' };
};

const AudioAnalysisResult = ({ result, industryOptions }) => {
  if (!result) return null;
  const info = result.immediateScoreInfo;
  if (!info) return null;
  // Lấy loại ngành
  const audioUpload = info.packagesData.audioUpload;
  const audioServiceType = audioUpload?.audioServiceType || '';
  const industry = industryOptions?.find(opt => opt.groupValue === audioServiceType) || {};
  // Lấy data ngành cụ thể
  const audioVarName = 'audio' + audioServiceType.charAt(0).toUpperCase() + audioServiceType.slice(1);
  const data = info.packagesData[audioVarName];
  if (!data) return null;
  const score = data.score || 0;
  const percent = Math.round((score / 1000) * 100);
  const risk = getRiskLevel(score);
  const subScores = data.audioSubScores || {};
  // Map lại tên chỉ số cho đẹp
  const labelMap = {
    Burnout: 'Burnout',
    Cooperation: 'Cooperation',
    EmotionalStability: 'Emotional Stability',
    EnergyLevel: 'Energy Level',
    FinancialRisk: 'Financial Risk',
    Open: 'Open',
    PriceValueConsumer: 'Opportunistic',
    DebtRepaymentProbability: 'Debt Repayment Probability',
    Conscientiousness: 'Conscientiousness',
  };
  // Tối đa điểm cho từng chỉ số (dựa vào dữ liệu mẫu)
  const maxMap = {
    Burnout: 10,
    Cooperation: 5,
    EmotionalStability: 5,
    EnergyLevel: 10,
    FinancialRisk: 10,
    Open: 5,
    PriceValueConsumer: 10,
    DebtRepaymentProbability: 10,
    Conscientiousness: 10,
  };
  return (
    <div className="audio-result-root">
      <div className="audio-result-header">
        {/* Risk label/percent cho mobile */}
        <div className="audio-result-risk-mobile">
          <span className="audio-result-risk-label" style={{color: risk.color}}>{risk.label}</span>
          <span className="audio-result-risk-percent" style={{color: risk.color}}>{percent}%</span>
        </div>
        <div className="audio-result-title">{industry.label || 'Report'} probability</div>
        <div className="audio-result-desc">
          All data we use is provided with explicit user consent, publicly available and is fully compliant with local data privacy and protection frameworks in Indonesia, Vietnam, the Philippines, Malaysia, Pakistan, Bangladesh and other markets.
        </div>
        {/* Risk label/percent cho desktop (vẫn giữ nguyên) */}
        <div className="audio-result-risk">
          <div className="audio-result-risk-circle">
            {/* <svg width="120" height="120">
              <circle cx="60" cy="60" r="54" stroke="#e6f4ea" strokeWidth="8" fill="none" />
              <circle cx="60" cy="60" r="54" stroke={risk.color} strokeWidth="8" fill="none" strokeDasharray={339.292} strokeDashoffset={339.292 - (percent/100)*339.292} style={{transition:'stroke-dashoffset 1s'}}/>
            </svg> */}
            <div className="audio-result-risk-content">
              <div className="audio-result-risk-label" style={{color: risk.color}}>{risk.label}</div>
              <div className="audio-result-risk-percent">{percent}%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="audio-result-bars">
        {Object.entries(subScores).map(([key, value]) => (
          <div className="audio-result-bar-row" key={key}>
            <div className="audio-result-bar-label">{labelMap[key] || key}</div>
            <div className="audio-result-bar-score">{value}/{maxMap[key] || 10}</div>
            <div className="audio-result-bar-outer">
              <div className="audio-result-bar-inner" style={{width: `${(value/(maxMap[key]||10))*100}%`}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioAnalysisResult; 