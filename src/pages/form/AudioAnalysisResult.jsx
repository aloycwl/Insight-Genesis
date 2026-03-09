import "./AudioAnalysisResult.css";

const formatLabel = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
};

const formatValue = (value) => {
  if (typeof value === "number" && value >= 0 && value <= 1)
    return `${Math.round(value * 100)}%`;

  return value;
};

const flattenObject = (obj, prefix = "") => {
  let items = [];

  Object.entries(obj).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix} ${formatLabel(key)}` : formatLabel(key);
    if (typeof value === "object" && value !== null && !Array.isArray(value))
      items = items.concat(flattenObject(value, newKey));
    else if (key !== "success") items.push({ key: newKey, value: value });
  });

  return items;
};

const AnalysisReport = ({ result }) => {
  if (!result) return null;
  const items = flattenObject(result);

  return (
    <div className="report-container">
      <h2 className="report-title">Voice Analysis Report</h2>

      <div className="report-grid">
        {items.map((item, i) => (
          <div className="report-card" key={i}>
            <div className="report-card-title">
              <strong>{item.key}</strong>
            </div>
            <div className="report-card-content">
              {Array.isArray(item.value)
                ? item.value.join(", ")
                : formatValue(item.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisReport;
