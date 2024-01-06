import React, { InputHTMLAttributes, useState } from 'react';

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon: string;
  type: string;
}

const InputBox: React.FC<InputBoxProps> = ({ type, icon, label, ...props }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <div className="relative w-full mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <div className='relative'>
        <i className={"fi " + icon + " input-icon"} />

        <input
          {...props}
          type={type === "password" ? (passwordVisible ? "text" : "password") : type}
          className="input-box"
        />

        {type === "password" && (
          <i
            className={`fi ${passwordVisible ? "fi-rr-eye" : "fi-rr-eye-crossed"} input-icon left-[auto] right-4 cursor-pointer`}
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
          ></i>
        )}
      </div>
    </div>
  );
};

export default InputBox;

/* https://youtu.be/J7BGuuuvDDk?list=LL&t=13830 */