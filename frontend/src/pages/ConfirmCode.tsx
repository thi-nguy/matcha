import { useState } from 'react';
import { Title, TextInput, Button, Center } from '../components/index';

const ConfirmCodePage = () => {

  const [codeInput, setCodeInput] = useState<string>('');

  const handleSubmit = () => {

  };

  return (
    <Center
      content={
        <>
          <Title value='We sent you a code by email' />
          <TextInput title='Enter the code' value={codeInput} onChange={setCodeInput} placeholder='Ex: 3687' />
          <Button title='Submit' onSubmit={handleSubmit} />
        </>
      }
    />
  );
};

export default ConfirmCodePage;
