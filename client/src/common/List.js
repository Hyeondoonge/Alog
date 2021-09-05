import styled from 'styled-components';
import Tag from './Tag';

const StyledList = styled.div`
  flex-wrap: wrap;
  display: flex;
  & * {
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

function ListItem({ element, index }) {
  return <Tag label={element} />;
}

// 1. for filter
export default function List({ elements, states, updateStates }) {
  return (
    <StyledList>
      {elements.map((element, index) => (
        <Tag
          size={2.0}
          label={element}
          selected={states[element]}
          clickable
          handleClick={() => {
            const newStates = { ...states };
            newStates[element] = !newStates[element];
            updateStates(newStates);
          }}
        />
      ))}
    </StyledList>
  );
}

export { ListItem };
