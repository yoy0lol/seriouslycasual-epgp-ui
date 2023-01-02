import Header from './components/Layout/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import PlayerPage from './pages/playerpage/PlayerPage';

function App() {
  return (
    <div className='min-h-screen w-screen bg-gradient-to-t from-bgGr1 to-bgGr2'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-text h-full min-w-full'>
        <BrowserRouter>
          {/* <Header /> */}

          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/characters/:region/:realm/:playerName' element={<PlayerPage />}></Route>
            <Route path='*' element={<Navigate to='/' />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
