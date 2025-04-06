import React from 'react';

const FlashcardGroups = ({ groups, onGroupSelect }) => {
  return (
    <div className="group-list">
      {/* Render a button for each group */}
      {groups.map((group) => (
        <button key={group} onClick={() => onGroupSelect(group)}>
          {group}
        </button>
      ))}
    </div>
  );
};

export default FlashcardGroups;