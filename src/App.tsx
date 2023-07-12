import './App.css';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBot />
      </header>
    </div>
  );
}

export default App;
