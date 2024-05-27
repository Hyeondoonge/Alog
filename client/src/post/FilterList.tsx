import List from '../common/List';
import Tag from '../common/Tag';

interface FilterListProps {
  elements: FilterItemProps[];
  states: boolean[];
  handleClick: (index: number) => () => void;
}

interface FilterItemProps {
  _id: string;
  name: string;
}

export default function FilterList({ elements, states, handleClick }: FilterListProps) {
  return (
    <List>
      {elements.map(({ _id: id, name }, index) => (
        <Tag
          key={id}
          size={2}
          label={name}
          selected={states[index]}
          clickable
          handleClick={handleClick(index)}
        />
      ))}
    </List>
  );
}
