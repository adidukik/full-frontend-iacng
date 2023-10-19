import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCategory } from "./categoriesSlice";
import "./CategoriesMenu.css";
import {
  setBigNumberId,
  setBigNumberValue,
  setCurrentBigNumberTab,
} from "../BigNumbers/bigNumbersSlice";
import { useSelector } from "react-redux";

const firstBigNumbers: string[] = [
  "oil_yield",
  "energy_generation",
  "",
  "opec",
];

const CategoriesMenu = () => {
  const dispatch = useDispatch();
  const items = [
    "нефтегазовая отрасль",
    "электроэнергетика",
    "урановая промышленность",
    "ОПЕК+",
  ];

  const handleSelect = (selectedKey: string) => {
    const categoryIndex = items.indexOf(selectedKey);
    dispatch(setCategory(categoryIndex));
    dispatch(setBigNumberValue(0));
    dispatch(setBigNumberId(firstBigNumbers[categoryIndex]));
    if (categoryIndex === 3) {
      dispatch(setCurrentBigNumberTab("баррели"));
    } else {
      dispatch(setCurrentBigNumberTab("сутки"));
    }
  };

  return (
    <div className="card-categories categories-menu">
      <Nav
        variant="tabs"
        defaultActiveKey="нефтегазовая отрасль"
        onSelect={handleSelect}
      >
        {items.map((item, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={item} className="categories-menu__category">
              {item}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default CategoriesMenu;
