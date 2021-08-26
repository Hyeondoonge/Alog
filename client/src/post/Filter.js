import Tag from '../common/Tag';

// * 내부의 Tag요소들을 일정한 간격으로 조정하는 div column, row 방향으로 가능하며 여러 줄도
// 가능.
export default function Filter({ elements, state, updateState }) {
  return elements.map((lan, index) => (
    <Tag
      label={lan}
      selected={state[index]}
      handleClick={() => {
        const newState = [...state];
        newState[index] = !state[index];
        updateState(newState);
      }}
    />
  ));
}
