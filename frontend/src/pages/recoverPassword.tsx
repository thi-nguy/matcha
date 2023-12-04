import { useState } from 'react';
import {
  TextInput,
  Button,
  Title
} from '../components/index';

const RecoverPasswordPage = () => {

  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleSubmit = () => {
  };

  return (
    <div className='flex h-screen'>
      <div className='m-auto w-96'>
        <Title value='Recover your password'/>
        <TextInput title='New password' placeholder='' value={password} onChange={setPassword} secure={true} />
        <TextInput title='Repeat password' placeholder='' value={repeatPassword} onChange={setRepeatPassword} secure={true}/>
        <Button title='Submit' onSubmit={handleSubmit}/>
      </div>
    </div>
  )
};

export default RecoverPasswordPage;
