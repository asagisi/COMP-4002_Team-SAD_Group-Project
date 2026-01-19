import './App.css'
import { NavBar } from './components/navbar/NavBar'
import { WatchProgress } from './components/watchprogress/WatchProgress'
import { ShowList } from './components/showlist/ShowList'


function App() {
  return (
    <div className="App">

       
      <header> 
         <NavBar />
        <h1> TV show collection</h1>
      </header>

      <main>
      <WatchProgress/>
      <ShowList />
      </main>

      <footer>
        <p> Team SAD: Seth Moran, Angelito Sagisi, Dennis Guiboche</p>
      </footer>

    </div>

  )
}

export default App
