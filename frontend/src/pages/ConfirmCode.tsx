import { useState } from 'react';
import { Title, TextInput, Button } from '../components/index';

const ConfirmCodePage = () => {

  const [codeInput, setCodeInput] = useState<string>('');

  const handleSubmit = () => {

  };

  return (
    <div className='flex h-screen'>
      <div className='m-auto w-96'>
        <Title value='We sent you a code by email' />
        <TextInput title='Enter the code' value={codeInput} onChange={setCodeInput} placeholder='Ex: 3687' />
        <Button title='Submit' onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ConfirmCodePage;
