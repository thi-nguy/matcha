import { Select } from './index';

const availableTags = [
  {
    value: 'music',
    name: 'Music'
  },
  {
    value: 'movies',
    name: 'Movies'
  },
  {
    value: 'sport',
    name: 'Sport'
  }
];

export const Tags = ({
  selectedTags,
  onDelete,
  onAdd,
  select
}: {
  selectedTags: { value: string, name: string }[],
  onDelete: (value: string) => void,
  onAdd: (newTag: { value: string, name: string }) => void,
  select: string
}) => {

  const findTagByValue = (value: string) => {
    return availableTags.find((tag: { value: string, name: string }) => tag.value === value);
  };

  return (
    <div>
      <Select
        title='Choose one or more tags'
        data={availableTags}
        onSelect={(value: string) => {
          const newTag = findTagByValue(value);
          if (newTag) {
            onAdd(newTag);
          }
        }}
        select={select}
      />
      <div className='m-2.5'>
        {selectedTags.map((tags: { name: string, value: string }, index: number) => (
          <span className='mr-1.5' key={index}>{tags.name} <span onClick={() => onDelete(tags.value)}>&#10006;</span></span>
        ))}
      </div>
    </div>
  );
};
