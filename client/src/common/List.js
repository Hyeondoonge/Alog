import styled from 'styled-components';
import Tag from './Tag';

const StyledList = styled.div`
  width: 100%;
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
export default function List({ elements, state, updateState }) {
  return (
    <StyledList>
      {elements.map((element, index) => (
        <Tag
          label={element}
          selected={state[index]}
          handleClick={() => {
            const newState = [...state];
            newState[index] = !state[index];
            updateState(newState);
          }}
        />
      ))}
    </StyledList>
  );
}

export { ListItem };
