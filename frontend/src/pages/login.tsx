import {
  Button,
  Title,
  TextInput,
  Link,
  Center
} from '../components/index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <Center
      content={
        <>
          <Title value='Welcome back!'/>
          <TextInput title='Email address' placeholder='john.doe@gemail.com' value={email} onChange={setEmail}/>
          <TextInput title='Password' placeholder='Your password' value={password} onChange={setPassword} secure={true}/>
          <Button title='Submit' onSubmit={handleSubmit}/>
          <Link title="I don't have an account" onClick={() => navigate('/signup')} />
          <Link title="Forgot your password ?" onClick={() => navigate('/recover-password')} />
        </>
      }
    />
  );
};

export default LoginPage;
