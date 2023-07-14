import './App.css';
import BigNumbers from './components/BigNumbers/BigNumbers.tsx';
import Map from './components/Map/Map.tsx';
import Graph from './components/Graph/graph.tsx';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import NavBar from './components/NavBar/NavBar.tsx';
import Regions from './components/Regions/Regions.tsx';

function App() {
  return (
    <div className="App">
      <div className="NavBar">
      <NavBar />
      </div>
      <div className="BigNumbers">
        <BigNumbers />
      </div>
      <div className="Map">
        <Map />
      </div>
      <div className="Graph">
        <Graph />
      </div>
      <div className="Regions">
        <Regions />
      </div>
      <div className="ChatBot">
        <ChatBot />
      </div>
  </div>
  );
}

export default App;
