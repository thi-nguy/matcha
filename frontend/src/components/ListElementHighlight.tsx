export const ListElementHighlight = ({ number, title, subtitle }: { number: number, title: string, subtitle: string }) => {
  return (
      <div className='pb-3'>
        <div className='text-2xl'>{number}. {title}</div>
        <div className='text-xs italic'>{subtitle}</div>
      </div>
  );
};
