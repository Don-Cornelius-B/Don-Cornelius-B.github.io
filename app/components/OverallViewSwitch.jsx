'use client';
import { vt323 } from '../fonts/fonts';

const OverallViewSwitch = ({ isExplorerOpen, setIsExplorerOpen }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: isExplorerOpen ? 'auto' : '100%', 
        padding: '10px 0', 
        borderBottom: isExplorerOpen ? '1px solid rgba(255,255,255,0.3)' : 'none',
        transition: 'height 0.4s',
        width: '100%'
      }}
    >
      <button 
        className={`${vt323.className} view-switch-btn ${isExplorerOpen ? 'active' : ''}`}
        onClick={() => setIsExplorerOpen(!isExplorerOpen)}
      >
        [ {isExplorerOpen ? 'TERMINAL VIEW' : 'OVERALL VIEW'} ]
      </button>
      <style jsx>{`
        .view-switch-btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          color: #ffffff;
          font-family: inherit;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          padding: 6px 16px;
          cursor: pointer;
          border: 1px solid transparent;
          text-transform: uppercase;
          transition: all 0.2s ease;
        }
        .view-switch-btn:hover {
          background: #ffffff;
          color: #000000;
          border: 1px solid #ffffff;
          font-weight: bold;
        }
        .view-switch-btn.active {
          background: #ffffff;
          color: #000000;
          border: 1px solid #ffffff;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default OverallViewSwitch;
