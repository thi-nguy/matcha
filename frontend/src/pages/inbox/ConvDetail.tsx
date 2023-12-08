import { IConvDetail } from "./interfaces/IConvDetail";

const ConvDetail = ({ data, is_user_id } : { data: IConvDetail, is_user_id: boolean }) => {
  
  if (is_user_id){
    return (
      <div className='text-right p-2 bg-neutral-800 text-white w-fit right-4 absolute rounded-full'>
        {data.content}
      </div>
    );
  }

  return (
    <div className='text-left p-2 bg-orange-500 text-white w-fit rounded-full'>
      {data.content}
    </div>
  );
};

export default ConvDetail;
