import React from 'react';

export default function ProfileModal({ setIsProfileOpen, personalStats }) {
  return (
    <div className="result-overlay animate-fade-in" onClick={() => setIsProfileOpen(false)}>
      <div className="result-modal profile-panel" onClick={(e) => e.stopPropagation()}>
        <h2><i className="fa-solid fa-user-gear text-gold"></i> Твоя аналітика</h2>
        
        <div className="stats-container">
          <div className="profile-stat-box">
            <span className="p-label">Всього ігор</span>
            <span className="p-value">{personalStats.wins + personalStats.losses}</span>
          </div>
          <div className="profile-stat-box">
            <span className="p-label">Вінрейт</span>
            <span className="p-value">
              {personalStats.wins + personalStats.losses > 0 
                ? `${((personalStats.wins / (personalStats.wins + personalStats.losses)) * 100).toFixed(1)}%`
                : "0%"}
            </span>
          </div>
          <div className="profile-stat-box">
            <span className="p-label">Найбільший куш</span>
            <span className="p-value" style={{ color: '#4caf50' }}>
              ${(personalStats.biggestWin || 0).toFixed(2)}
            </span>
          </div>
        </div>

        <button className="close-result-btn" onClick={() => setIsProfileOpen(false)}>ЗАКРИТИ</button>
      </div>
    </div>
  );
}