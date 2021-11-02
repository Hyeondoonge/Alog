import List from '../common/List';
import Tag from '../common/Tag';

// * 내부의 Tag요소들을 일정한 간격으로 조정하는 div column, row 방향으로 가능하며 여러 줄도 가능.

export default function FilterList({ elements, state, handleClick }) {
  return (
    <List clickable>
      {elements.map(({ _id: id, name }, index) => (
        <Tag // List Item
          key={id}
          size={2}
          label={name}
          selected={state[index]}
          clickable
          handleClick={handleClick(index)} // call handleClick(index)(event)
        />
      ))}
    </List>
  );
}
