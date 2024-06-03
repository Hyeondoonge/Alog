import styled from 'styled-components';
import { RiGhost2Fill } from 'react-icons/ri';

interface ProfileImageProps {
  size: `${string}rem`;
  filename?: string;
}

const StyledProfileImage = styled.img<Pick<ProfileImageProps, 'size'>>`
  width: calc(${(props) => props.size} + 0.5rem);
`;

export default function ProfileImage({ filename, size }: ProfileImageProps) {
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
