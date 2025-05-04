import { useState } from "react";
import { TextInput, Button, Title } from "../components/index";

const RecoverPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const handleSubmit = () => {};

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Title value="Recover your password" />
      <TextInput
        title="New password"
        placeholder=""
        value={password}
        onChange={setPassword}
        secure={true}
      />
      <TextInput
        title="Repeat password"
        placeholder=""
        value={repeatPassword}
        onChange={setRepeatPassword}
        secure={true}
      />
      <Button onSubmit={handleSubmit}>Submit</Button>
    </div>
  );
};

export default RecoverPasswordPage;
