export const Button = ({
  title,
  variant = 'success',
  onSubmit
}: {
  title: string,
  variant?: string,
  onSubmit: () => void
}) => {
  return (
    <div className='cursor-pointer text-center bg-green-500 rounded-3xl m-2.5 w-auto mt-5 p-1' onClick={onSubmit}>
      <button className='text-white'>{title}</button>
    </div>
  )
};
