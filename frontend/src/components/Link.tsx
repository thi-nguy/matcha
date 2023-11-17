import { useNavigate } from 'react-router-dom';

export const Link = ({ title, url }: { title: string, url: string }) => {
  const navigate = useNavigate();
  return (
    <div className='underline text-center m-2.5 cursor-pointer' onClick={() => navigate(url)}>
      {title}
    </div>
  );
};
