import { useState } from "react";
import {
  TextInput,
  Title,
  Button,
  Select,
  TextArea,
  Tags,
  PictureUpdate,
} from "../../components";

const ProfilEditPage = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [biographie, setBiographie] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<
    { value: string; name: string }[]
  >([]);
  const [select, setSelect] = useState<string>("");
  const [selectGender, setSelectGender] = useState<string>("");
  const [selectSexualPreference, setSelectSexualPreference] =
    useState<string>("");

  const handleSubmit = () => {};

  return (
    <div>
      <Title value="Update your profile" />
      <TextInput
        title="Email address"
        placeholder="john.doe@email.com"
        value={email}
        onChange={setEmail}
      />
      <TextInput
        title="Username"
        placeholder="@johndoe"
        value={username}
        onChange={setUsername}
      />
      <Select
        title="Gender"
        data={[
          {
            value: "man",
            name: "Man",
          },
          {
            value: "woman",
            name: "Woman",
          },
        ]}
        onSelect={(value: string) => setSelectGender(value)}
        select={selectGender}
      />
      <Select
        title="Sexual preference"
        data={[
          {
            value: "man",
            name: "Man",
          },
          {
            value: "woman",
            name: "Woman",
          },
        ]}
        onSelect={(value: string) => setSelectSexualPreference(value)}
        select={selectSexualPreference}
      />
      <TextArea
        title="Biographie"
        placeholder="Hello world"
        value={biographie}
        onChange={setBiographie}
      />
      <Tags
        select={select}
        selectedTags={selectedTags}
        onDelete={(value: string) => {
          setSelectedTags(
            selectedTags.filter(
              (tag: { value: string; name: string }) => tag.value !== value
            )
          );
        }}
        onAdd={(newTag: { value: string; name: string }) => {
          setSelectedTags([...selectedTags, newTag]);
          setSelect("");
        }}
      />
      <PictureUpdate
        data={[
          "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
          "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
        ]}
      />
      <Button onSubmit={handleSubmit}>Submit</Button>
    </div>
  );
};

export default ProfilEditPage;
