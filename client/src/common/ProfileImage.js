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
        <StyledProfileImage
          src={`${process.env.REACT_APP_PROFILE_IMAGE_URL}/${filename}`}
          size={size}
        />
      ) : (
        <RiGhost2Fill size={size} />
      )}
    </div>
  );
}
