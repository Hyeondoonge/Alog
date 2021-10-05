import styled, { css } from 'styled-components';

const styleWithSize = {
  small: css``,
  medium: css``,
  large: css``
};

const StyledProfileImage = styled.img`
  ${(props) => props.styleWithSize}
`;

export default function ProfileImage({ size, color, link }) {
  const style = styleWithSize[size];

  return <StyledProfileImage src="" styleWithSize={style} />;
}
