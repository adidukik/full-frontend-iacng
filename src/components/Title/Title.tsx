import { Card } from "primereact/card";
import "./Title.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const Title = () => {
  const currentCompanyId = useSelector(
    (state: RootState) => state.auth.currentCompanyId,
  );

  return (
    <div className="card w-100">
      <span className="title d-flex align-items-center justify-content-center">
        СИТУАЦИОННО-АНАЛИТИЧЕСКИЙ ЦЕНТР ТОПЛИВНО-ЭНЕРГЕТИЧЕСКОГО КОМПЛЕКСА
        РЕСПУБЛИКИ КАЗАХСТАН {currentCompanyId !== 0 && " - САУТС ОЙЛ"}
      </span>
    </div>
  );
};

export default Title;
