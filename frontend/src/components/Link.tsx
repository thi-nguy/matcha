export const Link = ({ title, onClick }: { title: string, onClick: () => void }) => {
  return (
    <div className='underline text-center m-2.5 cursor-pointer' onClick={onClick}>
      {title}
    </div>
  );
};
