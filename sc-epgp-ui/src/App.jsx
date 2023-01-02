import Header from "./components/Layout/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/home/Home";
import PlayerPage from "./pages/playerpage/PlayerPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/characters/:region/:realm/:playerName"
            element={<PlayerPage />}
          ></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
