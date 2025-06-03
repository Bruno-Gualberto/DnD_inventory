import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Inventory from "./components/Inventory";
import Store from "./components/Store";
import Loot from "./components/Loot";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Tabs />
      <Routes>
        <Route path='/' element={<Inventory />} />
        <Route path='/store' element={<Store />} />
        <Route path='/loot' element={<Loot />} />
      </Routes>
    </>
  );
}

export default App;
