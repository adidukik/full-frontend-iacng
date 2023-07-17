import './App.css';
import BigNumbers from './components/BigNumbers/BigNumbers.tsx';
import Map from './components/Map/Map.tsx';
import Graph from './components/Graph/graph.tsx';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import NavBar from './components/NavBar/NavBar.tsx';
import Regions from './components/Regions/Regions.tsx';
import CategoriesMenu from './components/CategoriesMenu/CategoriesMenu.tsx';

function App() {
  return (
    <div className="App">
    <div className="Title" style={{background: "red"}}></div>
    <div className="TabMenu">
      <CategoriesMenu></CategoriesMenu>
    </div>
    <div className="BigNumbers" style={{background: "yellow"}}></div>
    <div className="ScrollingText" style={{background: "magenta"}}></div>
    <div className="Regions" style={{background: "blue"}}></div>
    <div className="Map" style={{background: "#e5e5e5"}}></div>
    <div className="ChatBot" style={{background: "black"}}></div>
    <div className="Graph"></div>
</div>
  );
}

export default App;
