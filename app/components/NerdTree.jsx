'use client';
import { useState } from 'react';
import { vt323 } from '../fonts/fonts';

const NerdTree = ({ selectedFile, setSelectedFile }) => {
  const [rootOpen, setRootOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);

  const [socialsOpen, setSocialsOpen] = useState(true);

  const getFileStyle = (fileName) => {
    const isSelected = selectedFile === fileName;
    return {
      cursor: 'pointer',
      backgroundColor: isSelected ? '#fff' : 'transparent',
      color: isSelected ? '#000' : '#fff',
      fontWeight: isSelected ? 'bold' : 'normal',
      display: 'inline-block',
      padding: '0 4px'
    };
  };

  return (
    <div style={{ flex: 1, padding: '10px', overflowY: 'auto', backgroundColor: 'transparent', color: '#fff', fontSize: '1.1rem' }} className={vt323.className}>
      <div 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => setRootOpen(!rootOpen)}
      >
        <span>{rootOpen ? '▼' : '►'} [D] don-cornelius-b/</span>
      </div>
      
      {rootOpen && (
        <>
          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: '8px' }}>  </span>
            <div 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={() => setProjectsOpen(!projectsOpen)}
            >
              <span>{projectsOpen ? '▼' : '►'} [D] projects/</span>
            </div>
          </div>
          
          {projectsOpen && (
            <>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>  │   </span>
                <span 
                  style={getFileStyle('multimodal-ai.txt')} 
                  onClick={() => setSelectedFile('multimodal-ai.txt')}
                >
                  |- multimodal-ai.txt
                </span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>  │   </span>
                <span 
                  style={getFileStyle('smart-rental.txt')} 
                  onClick={() => setSelectedFile('smart-rental.txt')}
                >
                  |- smart-rental.txt
                </span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>  │   </span>
                <span 
                  style={getFileStyle('portfolio.txt')} 
                  onClick={() => setSelectedFile('portfolio.txt')}
                >
                  |- portfolio.txt
                </span>
              </div>
            </>
          )}

          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: '8px' }}>  </span>
            <div 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={() => setSocialsOpen(!socialsOpen)}
            >
              <span>{socialsOpen ? '▼' : '►'} [D] socials/</span>
            </div>
          </div>
          
          {socialsOpen && (
            <>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>  │   </span>
                <span 
                  style={getFileStyle('github.txt')} 
                  onClick={() => setSelectedFile('github.txt')}
                >
                  |- github.txt
                </span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>  │   </span>
                <span 
                  style={getFileStyle('linkedin.txt')} 
                  onClick={() => setSelectedFile('linkedin.txt')}
                >
                  |- linkedin.txt
                </span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>  │   </span>
                <span 
                  style={getFileStyle('contact.txt')} 
                  onClick={() => setSelectedFile('contact.txt')}
                >
                  |- contact.txt
                </span>
              </div>
            </>
          )}

          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: '8px' }}>  </span>
            <span 
              style={getFileStyle('skills.txt')} 
              onClick={() => setSelectedFile('skills.txt')}
            >
              |- skills.txt
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: '8px' }}>  </span>
            <span 
              style={getFileStyle('bio.txt')} 
              onClick={() => setSelectedFile('bio.txt')}
            >
              |- bio.txt
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: '8px' }}>  </span>
            <span 
              style={getFileStyle('resume.txt')} 
              onClick={() => setSelectedFile('resume.txt')}
            >
              |- resume.txt
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default NerdTree;
