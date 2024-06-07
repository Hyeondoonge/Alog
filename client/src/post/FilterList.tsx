import ClickbaleTag from 'common/ClickableTag';
import List from '../common/List';

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
        <ClickbaleTag
          size={2}
          key={id}
          label={name}
          selected={states[index]}
          handleClick={handleClick(index)}
        />
      ))}
    </List>
  );
}
