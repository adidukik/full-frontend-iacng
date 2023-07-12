import { jsx as _jsx } from "react/jsx-runtime";
import './App.css';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';
function App() {
    return (_jsx("div", { className: "App", children: _jsx("header", { className: "App-header", children: _jsx(ChatBot, {}) }) }));
}
export default App;
