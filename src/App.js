import HomeScreen from "./Components/HomeScreen/HomeScreen";
import Navbar from "./Components/Navbar/Navbar";
import SavedDataScreen from "./Components/SavedDataScreen/SavedDataScreen";
import HeroCard from "./Components/HeroCards/HeroCard";
import Modal from "./Components/SavedDataScreen/Modal/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <HeroCard />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/savedData" element={<SavedDataScreen />} />
          <Route path="/remove/:id" element={<Modal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
