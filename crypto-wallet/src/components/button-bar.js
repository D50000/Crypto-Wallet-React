import styled from "styled-components";
import Button from "@mui/material/Button";

const ButtonContainer = styled.div`
  width: 50vw;
  display: flex;
  justify-content: space-between;
`;

const saveWallet = (filteredResults) => {
  console.log("Save");
  localStorage.setItem("walletSnapshot", JSON.stringify(filteredResults));
};

const cleanWallet = () => {
  console.log("Clear");
  localStorage.removeItem("walletSnapshot");
};

const refreshData = () => {
  console.log("Refresh");
  window.location.reload(false);
};

export default function ButtonBar(props) {
  return (
    <ButtonContainer>
      <button onClick={(e) => saveWallet(props.filteredResults)}>Save</button>
      <button onClick={(e) => cleanWallet()}>Clear</button>
      <button onClick={(e) => refreshData()}>Refresh</button>
      <Button variant="contained">Hello World</Button>
    </ButtonContainer>
  );
}
