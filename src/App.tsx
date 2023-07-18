import './App.css';
import BigNumbers from './components/BigNumbers/BigNumbers.tsx';
import AppMap from './components/Map/AppMap.tsx';
import Graph from './components/Graph/graph.tsx';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import NavBar from './components/NavBar/NavBar.tsx';
import Regions from './components/Regions/Regions.tsx';
import CategoriesMenu from './components/CategoriesMenu/CategoriesMenu.tsx';
import Title from './components/Title/Title.tsx';

function App() {
  return (
    <div className="App">
    <div className="Title" style={{background:"yellow"}}>
      {/* <Title /> */}
    </div>
    <div className="TabMenu" style={{background:"pink"}}>
      {/* <CategoriesMenu></CategoriesMenu> */}
    </div>
    <div className="BigNumbers" style={{background:"yellow"}}>
      <BigNumbers></BigNumbers>
    </div>
    <div className="ScrollingText"></div>
    <div className="Regions" style={{background:"green"}}>
      {/* <Regions></Regions> */}
    </div>
    <div className="Map">
      <AppMap />
    </div>
    <div className="ChatBot" style={{background:"magenta"}}>
      {/* <ChatBot /> */}
    </div>
    <div className="Graph" style={{background:"red"}}>
      {/* <Graph /> */}
    </div>
</div>
  );
}

export default App;
