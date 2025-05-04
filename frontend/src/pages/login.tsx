import { Button, Title, TextInput, Link } from "../components/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Title value="Welcome back!" />
      <TextInput
        title="Email address"
        placeholder="john.doe@gemail.com"
        value={email}
        onChange={setEmail}
      />
      <TextInput
        title="Password"
        placeholder="Your password"
        value={password}
        onChange={setPassword}
        secure={true}
      />
      <Button onSubmit={handleSubmit}>Submit</Button>
      <Link
        title="I don't have an account"
        onClick={() => navigate("/signup")}
      />
      <Link
        title="Forgot your password ?"
        onClick={() => navigate("/recover-password")}
      />
    </div>
  );
};

export default LoginPage;
