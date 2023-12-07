export const Center = ({ content }: { content: any }) => {
  return (
    <div className='flex h-screen'>
      <div className='m-auto w-96'>
        {content}
      </div>
    </div>
  );
};
