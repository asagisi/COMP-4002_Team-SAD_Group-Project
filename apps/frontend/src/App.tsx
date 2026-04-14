import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './layout/header/header'
import { Home } from './layout/pages/Home'
import { ShowListPage } from './layout/pages/ShowListPage'
import { MyShowsPage } from './layout/pages/MyShows'
import { WatchProgressPage } from './layout/pages/WatchProgressPage'
import { Footer } from './layout/footer/footer'





function App() {
  return (
    <Router>
      <div className="App">
        <Header />
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
