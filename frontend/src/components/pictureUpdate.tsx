export const PictureUpdate = ({
  data
}: {
  data: string[]
}) => {
  return (
    <div className='m-2.5'>
      <div>Pictures</div>
      <div className='flex'>
        <div className='mt-auto mb-auto'>
          <input type='file'/>
        </div>
        {data.map((img: string, index: number) => (
          <img key={index} className='mr-1.5' src={img} alt='picture of user' width='200px' />
        ))}
      </div>
    </div>
  );
};
