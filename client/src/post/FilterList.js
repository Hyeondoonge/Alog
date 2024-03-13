import List from '../common/List';
import Tag from '../common/Tag';

export default function FilterList({ elements, state, handleClick }) {
  return (
    <List clickable>
      {elements.map(({ _id: id, name }, index) => (
        <Tag
          key={id}
          size={2}
          label={name}
          selected={state[index]}
          clickable
          handleClick={handleClick(index)}
        />
      ))}
    </List>
  );
}
