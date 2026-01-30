import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/header'
import { Home } from './pages/Home'
import { ShowListPage } from './pages/ShowListPage'
import { WatchProgressPage } from './pages/WatchProgressPage'
import { Footer } from './components/footer/footer' 



function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showlist" element={<ShowListPage />} />
          <Route path="/watchlist" element={<WatchProgressPage />} />
        </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
