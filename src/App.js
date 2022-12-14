import React from "react";

const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      {atmMode && <h3> {choice[Number(!isDeposit)]}</h3>}
      {atmMode && (
        <input
          id="number-input"
          type="number"
          width="200"
          onChange={onChange}
        ></input>
      )}
      {atmMode && (
        <input
          type="submit"
          width="200"
          value="Submit"
          id="submit-input"
          disabled={!isValid}
        ></input>
      )}
    </label>
  );
};

function App() {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    console.log(`Valid-- ${validTransaction}`);
    if (event.target.value <= 0) {
      setValidTransaction(false);
      return;
    }
    if (atmMode === "Cash Back" && event.target.value > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    setAtmMode(e.target.value);
    if (e.target.value === "Deposit") {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>
      <ATMDeposit
        onChange={handleChange}
        isDeposit={isDeposit}
        atmMode={atmMode}
        isValid={validTransaction}
      ></ATMDeposit>
    </form>
  );
}

export default App;

