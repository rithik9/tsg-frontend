import './ProgressBar.css';

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className="progress-container">
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${clampedValue}%` }} 
        />
      </div>
      <span className="progress-text">{clampedValue}%</span>
    </div>
  );
};

export default ProgressBar;