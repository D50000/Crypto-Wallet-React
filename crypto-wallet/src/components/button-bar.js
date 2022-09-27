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
      <Button
        variant="contained"
        onClick={(e) => saveWallet(props.filteredResults)}
      >
        Save
      </Button>
      <Button variant="contained" onClick={(e) => cleanWallet()}>
        Clear
      </Button>
      <Button variant="contained" onClick={(e) => refreshData()}>
        Refresh
      </Button>
    </ButtonContainer>
  );
}
