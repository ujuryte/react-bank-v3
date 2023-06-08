import './App.scss';
import { Data } from './Store';
import NavBar from './Components/NavBar';
import DisplayPages from './Components/DisplayPages';
import Messages from './Components/Messages';



function App() {


  return (
  
      <Data>
        <NavBar />
        <DisplayPages />
        <Messages/>
      </Data>

  );
}

export default App;
