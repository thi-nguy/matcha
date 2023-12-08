import { useState } from "react";
import { Button, TextInput, Title } from "../../components";
import ListConvComponent from "./ListConvComponent";
import { IListConv } from "./interfaces/IListConv";
import ConvDetail from "./ConvDetail";
import { IConvDetail } from "./interfaces/IConvDetail";

const ListConvData: IListConv[] = [
  {
    id: '0',
    firstname: 'firstname 00',
    lastname: 'lastname 00',
    picture: 'https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_1280.jpg'
  },
  {
    id: '1',
    firstname: 'firstname 01',
    lastname: 'lastname 01',
    picture: 'https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_1280.jpg'
  }
];

const ConvDetailData: IConvDetail[] = [
  {
    id: '0',
    content: 'msg 0',
    created_at: '2023-10-10 14:47',
    created_by: '0'
  },
  {
    id: '1',
    content: 'msg 1',
    created_at: '2023-10-10 14:52',
    created_by: '1'
  }
];

const USER_ID = '1';

const FIRSTNAME = 'Firstname 00';
const LASTNAME = 'Lastname 00';

const InboxPage = () => {

  const [input, setInput] = useState<string>('');

  const handleSubmit= () => {

  };

  return (
    <div className='flex'>
      <div className='w-1/3 border-r-2'>
        <ListConvComponent data={ListConvData}/>
      </div>
    <div className='w-full flex flex-col min-h-screen'>
        <Title value={`${FIRSTNAME} ${LASTNAME}`} />
        <div className='p-5'>
          {ConvDetailData.map((data: IConvDetail) => (
            <ConvDetail key={data.id} data={data} is_user_id={USER_ID === data.created_by}/>
          ))}
        </div>
        <div className='mt-auto flex justify-center'>
          <div className='w-11/12 mt-2'>
            <TextInput title='' placeholder='your message' value={input} onChange={setInput} />
          </div>
          <div className='w-1/12'>
            <Button title='Submit' onSubmit={handleSubmit}/>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default InboxPage;
