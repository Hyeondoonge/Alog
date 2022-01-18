import styled from 'styled-components';
import { RiGhost2Fill } from 'react-icons/ri';

const StyledProfileImage = styled.img`
  width: calc(${(props) => props.size} + 0.5rem);
`;

export default function ProfileImage({ filename, size, color, link }) {
  return (
    <div
      style={{
        display: 'flex',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {filename ? (
        <StyledProfileImage src={`/api/images/profile/${filename}`} size={size} />
      ) : (
        <RiGhost2Fill size={size} />
      )}
    </div>
  );
}
