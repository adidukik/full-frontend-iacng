import './App.css';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import BigNumbers from './components/BigNumbers/BigNumbers.tsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';

function App() {
  return (
    <div className="App">
      <BigNumbers />
        <ChatBot />
    </div>
  );
}

export default App;
