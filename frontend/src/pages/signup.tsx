import { useState } from "react";
import {
  Button,
  Title,
  TextInput,
  Link,
  ListElementHighlight,
} from "../components/index";
import { useNavigate } from "react-router-dom";

const dataListBenefit = [
  {
    title: "Tag based match",
    subtitle: "Tag allow you to meet someone like you",
  },
  {
    title: "Geographic filters",
    subtitle: "We help you meet someone close to you!",
  },
  {
    title: "Public fame rating",
    subtitle:
      "Unlike most web dating website, your public fame rating is visible so you can work on it",
  },
];

const SignupPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(username, email, firstname, lastname, password, repeatPassword);
  };

  return (
    <div className="md:flex h-screen">
      <div className="text-center md:text-left md:w-6/12 bg-slate-700 text-white justify-center items-center flex flex-col">
        <div>
          {dataListBenefit.map(
            (benefit: { title: string; subtitle: string }, index) => {
              return (
                <ListElementHighlight
                  key={index + 1}
                  number={index + 1}
                  title={benefit.title}
                  subtitle={benefit.subtitle}
                />
              );
            }
          )}
        </div>
      </div>
      <div className="md:w-6/12 justify-center flex flex-col p-20">
        <Title value="Create your matcha account!" />
        <TextInput
          title="Username"
          placeholder="Your login"
          value={username}
          onChange={setUsername}
        />
        <TextInput
          title="Email address"
          placeholder="john.doe@gmail.com"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          title="Firstname"
          placeholder="John"
          value={firstname}
          onChange={setFirstname}
        />
        <TextInput
          title="Lastname"
          placeholder="Doe"
          value={lastname}
          onChange={setLastname}
        />
        <TextInput
          title="Password"
          placeholder="Chosse a password"
          value={password}
          onChange={setPassword}
          secure={true}
        />
        <TextInput
          title="Repeat password"
          placeholder="Repeat the password"
          value={repeatPassword}
          onChange={setRepeatPassword}
          secure={true}
        />
        <Button title="Submit" onSubmit={handleSubmit} />
        <Link
          title="I already have an account"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

export default SignupPage;
