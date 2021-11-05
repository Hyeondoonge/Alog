import MarkdownPreview from '@uiw/react-markdown-preview';
import styled from 'styled-components';

const StyledPreviewWrapper = styled.div`
  font-size: inherit;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  box-shadow: 0 0 0.3rem 0.05rem black;
`;

const StyledPreview = styled(MarkdownPreview)`
  font-size: 2rem;
  width: 100%;
  ${(props) => props.styleWithWidth};
  padding: var(--textarea-margin, 2%);
  resize: none;
  border: 0px;
  min-height: 50rem;
  overflow: auto;

  & pre {
    background-color: #f4f4f4;
  }

  & pre * {
    background: transparent;
  }

  & code {
    color: black;
  }

  & blockquote {
    color: #d0d0d0;
  }

  & h1,
  h2,
  h3 {
    border-bottom: none;
  }
`;

export function MarkDownPreview({ source }) {
  return (
    <StyledPreviewWrapper>
      <StyledPreview source={source} />
    </StyledPreviewWrapper>
  );
}
