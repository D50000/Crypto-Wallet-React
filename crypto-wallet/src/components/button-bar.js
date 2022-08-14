import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 50vw;
  display: flex;
  justify-content: space-between;
`;

export default function ButtonBar() {
  return (
    <ButtonContainer>
      <button>Save</button>
      <button>Clear</button>
      <button>Reset</button>
    </ButtonContainer>
  );
}
