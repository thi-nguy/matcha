export const Select = ({
  title,
  data,
  onSelect,
  select
}: {
  title: string,
  data: { value: string, name: string }[],
  onSelect: (tag: string) => void,
  select: string
}) => {
  return (
    <div className='m-2.5'>
      <div>{title}</div>
      <select className='border-2 border-slate-400' onChange={(o) => onSelect(o.target.value)} value={select}>
        <option value=''>Please select an option</option>
        {data.map((item: { value: string, name: string }, index: number) => (
          <option key={index} value={item.value}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};
