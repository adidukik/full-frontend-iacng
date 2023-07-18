import './App.css';
import BigNumbers from './components/BigNumbers/BigNumbers.tsx';
import Map from './components/Map/Map.tsx';
import Graph from './components/Graph/graph.tsx';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import NavBar from './components/NavBar/NavBar.tsx';
import Regions from './components/Regions/Regions.tsx';
import CategoriesMenu from './components/CategoriesMenu/CategoriesMenu.tsx';
import Title from './components/Title/Title.tsx';
import ScrollingText from './components/ScrollingText/ScrollingText.tsx';

function App() {
  return (
    <div className="App">
    {/* <div className="Title" style={{background: 'green'}}>
      <Title />
    </div> */}
    <div className="Title">
      <Title />
    </div>
    {/* <div className = "center"> */}
    <div className="CategoriesMenu">
      <CategoriesMenu />
    </div>
    {/* </div> */}

    <div className="BigNumbers">
      <BigNumbers />
    </div>
    <div className="ScrollingText"></div>
    <div className="Regions" style={{background:"green"}}>
      {/* <Regions></Regions> */}
    </div>
    {/* <div className="CategoriesMenu" style={{background: "green"}}></div> */}
    <div className="ScrollingText">
      <ScrollingText />
    </div>
    <div className="Regions" style={{background: "blue"}}></div>
    <div className="Map" style={{background: "#e5e5e5"}}>
      <Map />
    </div>
    <div className="ChatBot" style={{background:"magenta"}}>
        <ChatBot />
    </div>
    <div className="Graph">
      <Graph />
    </div>
</div>
  );
}

export default App;
