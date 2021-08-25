import styled, { css } from 'styled-components';

const StyledTag = styled.span`
  border: 1px solid #5f939a;
  cursor: pointer;
  padding: 0.4em 0.7em;
  border-radius: 16px;
  transition: 0.4s;
  &:hover {
    box-shadow: 0 0 1px 1px #eee;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: #5f939a;
      color: white;
    `}
`;

export default function Tag({ label, selected, clickHandler }) {
  return (
    <StyledTag selected={selected} onClick={clickHandler}>
      {label}
    </StyledTag>
  );
}
