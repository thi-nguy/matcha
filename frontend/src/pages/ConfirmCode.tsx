import { useState } from "react";
import { Title, TextInput, Button } from "../components/index";

const ConfirmCodePage = () => {
  const [codeInput, setCodeInput] = useState<string>("");

  const handleSubmit = () => {};

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Title value="We've just sent you a code to your email!" />
      <TextInput
        title="Enter the code"
        value={codeInput}
        onChange={setCodeInput}
        placeholder="Ex: 3687"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default ConfirmCodePage;
