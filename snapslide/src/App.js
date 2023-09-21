import React ,{ useState } from 'react';
import './App.css';
import BottomSheet from './BottomSheet';

const bodyStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(7, 0, 0, 0.18)",
};


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handle_modal = (a) => {
    setIsModalOpen(a);
  };
  return (
    <div className="App" style={isModalOpen ? bodyStyle : {}}>
      <header className="App-header">
        <h1>React Bottom Sheet</h1>
      </header>
     
        <BottomSheet handle_modal={handle_modal} />
      
    </div>
  );
}

export default App;
