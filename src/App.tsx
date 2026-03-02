import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/header'
import { Home } from './pages/Home'
import { ShowListPage } from './pages/ShowListPage'
import { MyShowsPage } from './pages/MyShows'
import { WatchProgressPage } from './pages/WatchProgressPage'
import { Footer } from './components/footer/footer'
import { type Show } from './types/Show'





function App() {
  // this is the shared state for the favourite show
  const [currentFavourite, setCurrentFavourite] = useState<Show | null>(null)

  return (
    <Router>
      <div className="App">
        <Header currentFavourite={currentFavourite} setCurrentFavourite={setCurrentFavourite} />
        <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showlist" element={<ShowListPage />} />
          <Route path="/myshows" element={<MyShowsPage />} />
          <Route path="/watchlist" element={<WatchProgressPage />} />
        </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
