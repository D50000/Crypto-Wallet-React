import styled from "styled-components";
import Button from "@mui/material/Button";

const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  Button {
    width: 100px;
  }
`;

const saveWallet = (symbolList) => {
  console.log("Save");
  const existPairs = symbolList.filter(
    (pair) => pair.amount > 0 && pair.select
  );
  localStorage.setItem("walletSnapshot", JSON.stringify(existPairs));
};

const cleanWallet = (cleanData) => {
  console.log("Clear");
  localStorage.removeItem("walletSnapshot");
  cleanData();
};

const refreshData = () => {
  console.log("Refresh");
  window.location.reload(false);
};

export default function ButtonBar(props) {
  return (
    <ButtonContainer>
      <Button variant="contained" onClick={(e) => saveWallet(props.symbolList)}>
        Save
      </Button>
      <Button variant="contained" onClick={(e) => cleanWallet(props.cleanData)}>
        Clear
      </Button>
      <Button variant="contained" onClick={(e) => refreshData()}>
        Refresh
      </Button>
    </ButtonContainer>
  );
}
