import { Dispatch, SetStateAction } from 'react';

export const TextInput = ({
  title,
  placeholder = undefined,
  value,
  onChange,
  secure = false
}: {
  title: string,
  placeholder?: string,
  value: string,
  onChange: Dispatch<SetStateAction<string>>,
  secure?: boolean
}) => {
  return (
    <div className='m-2.5'>
      <div>{title}</div>
      <input
        type={secure ? 'password' : 'text'}
        className='border-2 border-slate-400 p-1 w-full'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
};
