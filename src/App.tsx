import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BigNumbers from './components/BigNumbers/BigNumbers.tsx';
import AppMap from './components/Map/AppMap.tsx';
import Graph from './components/Graph/Graph.tsx';
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
        <div className="Title align-items-center d-flex w-100">
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
    <div className="Regions">
      <Regions></Regions>
    </div>
    {/* <div className="CategoriesMenu" style={{background: "green"}}></div> */}
    <div className="ScrollingText">
      <ScrollingText />
    </div>
    <div className="Map" style={{background: "#e5e5e5"}}>
      <AppMap />
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
