import { useDispatch, useSelector } from "react-redux";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { Button } from "react-bootstrap";
import { RootState } from "../../../store";

export const BigNumberButton = ({ bigNumber, onClick }) => {
  const dispatch = useDispatch();
  const currentBigNumberId = useSelector(
    (state: RootState) => state.bigNumbers.currentBigNumberId,
  );
  const { title, id, data, tableHeaders } = bigNumber;
  const getTableItem = (bigNumberData) => {
    const formattedValue = formatNumberWithSpaces(bigNumberData.value);
    return (
      <tr className="big-numbers__data-table" key={bigNumberData.label}>
        <td> {bigNumberData.label}</td>
        <td> {formattedValue}</td>
      </tr>
    );
  };

  return (
    <Button
      variant="outline-primary"
      className={`big-numbers__btn ${
        currentBigNumberId === id && "big-numbers__btn-active"
      }`}
      onClick={onClick}
    >
      <h5 className="big-numbers__title">{bigNumber.title}</h5>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((el) => (
              <td>{el}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((bigNumberData) => getTableItem(bigNumberData))}
        </tbody>
      </table>
    </Button>
  );
};
