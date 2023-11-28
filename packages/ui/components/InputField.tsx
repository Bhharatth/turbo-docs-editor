import React from 'react';

type InputFieldPropType = {
  title?: string;
  type?: string;
  isRequired: boolean;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  handleState?: {
    inputState: string;
    changeInputState: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
  };
  handldeInputState?: {
    inputState: string[];
    changeInputState: React.Dispatch<React.SetStateAction<string[]>>;
  };
};

export const InputField: React.FC<InputFieldPropType> = ({
  title,
  type = 'text',
  isRequired = false,
  placeholder,
  disabled,
  handleState,
}: InputFieldPropType) => {
  return (
    <div>

        {handleState ? (<input
        type={type}
        name={title}
        id={title}
        placeholder={placeholder}
        value={handleState?.inputState || ''}
        onChange={(e) => handleState?.changeInputState?.(e.target.value)}
        required={isRequired}
        disabled={disabled}
        className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
      />):(
        <input
        type={type}
        name={title}
        id={title}
        placeholder={placeholder}
        required={isRequired}
        disabled={disabled}
        className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
      />
      )}
      
    </div>
  );
};
