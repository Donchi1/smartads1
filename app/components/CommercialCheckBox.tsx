import React from 'react'


interface CommentCheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
  }
  
  const CommentCheckbox: React.FC<CommentCheckboxProps> = ({ label, checked, onChange }) => (
    <div className="flex justify-between items-center">
      <label className="w-[95%] first-letter:uppercase" htmlFor={label}>
        {label}
      </label>
      <input
        type="checkbox"
        id={label}
        className="size-4"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
  

export default CommentCheckbox