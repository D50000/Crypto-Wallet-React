import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 50vw;
  display: flex;
  justify-content: space-between;
`;

const saveWallet = () => {
  console.log("Save");
  localStorage.setItem("walletSnapshot", {});
};

const cleanWallet = () => {
  console.log("Clear");
  localStorage.removeItem("walletSnapshot");
};

const refreshData = () => {
  console.log("Refresh");
  window.location.reload(false);
};

export default function ButtonBar() {
  return (
    <ButtonContainer>
      <button onClick={(e) => saveWallet()}>Save</button>
      <button onClick={(e) => cleanWallet()}>Clear</button>
      <button onClick={(e) => refreshData()}>Refresh</button>
    </ButtonContainer>
  );
}
