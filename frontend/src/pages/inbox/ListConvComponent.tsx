import { IListConv } from "./interfaces/IListConv";

const ListConvComponent = ({ data } : { data: IListConv[] }) => {
  return (
    <div>
      {data.map((conv: IListConv) => (
        <div key={conv.id} className='text-center border-b-2 p-5 flex justify-center'>
          <img src={conv.picture} width={50} className='rounded-full mr-2'/>
          <div className='mt-auto mb-auto'>{conv.firstname} {conv.lastname} </div>
        </div>
      ))}
    </div>
  );
};

export default ListConvComponent;
