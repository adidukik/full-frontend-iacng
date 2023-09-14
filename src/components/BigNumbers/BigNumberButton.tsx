import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

export const BigNumberButton = ({ bigNumber, isTable = false }) => {
  const getListItem = (bigNumberData, units = "") => {
    const formattedValue = formatNumberWithSpaces(bigNumberData.value);
    return (
      <li key={bigNumberData.label} className="big-numbers__data">
        <div>
          <>{bigNumberData.label}</>
          <br></br>
          <>{`${formattedValue} ${units}`}</>
        </div>
      </li>
    );
  };
  const getTableItem = (bigNumberData) => {
    const formattedValue = formatNumberWithSpaces(bigNumberData.value);
    return (
      <tr className="big-numbers__data-table" key={bigNumberData.label}>
        <td> {bigNumberData.label}</td>
        <td> {formattedValue}</td>
      </tr>
    );
  };
  if(isTable){
     return (
      <ul className="d-flex flex-column justify-content-between">
        {bigNumber.data.map((bigNumberData) => getListItem(bigNumberData))}
      </ul>
    );
  }
  if (bigNumber.data.length < 2) {
    return (
      <>
        {bigNumber.data[0].label}{" "}
        {formatNumberWithSpaces(bigNumber.data[0].value)}
      </>
    );
  } else if (bigNumber.data.length < 3) {
    return (
      <ul className="d-flex flex-row justify-content-between">
        {bigNumber.data.map((bigNumberData) => getListItem(bigNumberData))}
      </ul>
    );
  } else {
    return (
      <table>
        <tbody>
          {bigNumber.data.map((bigNumberData) => getTableItem(bigNumberData))}
        </tbody>
      </table>
    );
  }
};