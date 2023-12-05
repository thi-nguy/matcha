import { useState } from 'react';
import {
  TextInput,
  Button,
  Title,
  Center
} from '../components/index';

const RecoverPasswordPage = () => {

  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleSubmit = () => {
  };

  return (
    <Center
      content={
        <>
          <Title value='Recover your password'/>
          <TextInput title='New password' placeholder='' value={password} onChange={setPassword} secure={true} />
          <TextInput title='Repeat password' placeholder='' value={repeatPassword} onChange={setRepeatPassword} secure={true}/>
          <Button title='Submit' onSubmit={handleSubmit}/>
        </>
      }
    />
  )
};

export default RecoverPasswordPage;
