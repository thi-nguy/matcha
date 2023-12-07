import { Dispatch, SetStateAction } from 'react';

export const TextArea = ({
  title,
  placeholder = undefined,
  value,
  onChange,
  rows = 4
}: {
  title: string,
  placeholder?: string,
  value: string,
  onChange: Dispatch<SetStateAction<string>>,
  rows?: number
}) => {
  return (
    <div className='m-2.5'>
      <div>{title}</div>
      <textarea
        className='border-2 border-slate-400 p-1 w-full'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
      />
    </div>
  )
};
