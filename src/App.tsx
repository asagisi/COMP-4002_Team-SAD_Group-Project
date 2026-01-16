import './App.css'
import { WatchProgress } from './components/watchprogress/WatchProgress'
import { ShowList } from './components/showlist/showlist'

function App() {
  return (
    <div className="App">

      <main>
      <WatchProgress/>
      </main>

    </div>
      <header> 
        <h1> TV show collection</h1>

      </header>

      <main>
      <ShowList />
      </main>

      <footer>
        <p> Team SAD: Seth Moran, Angelito Sagisi, Dennis Guiboche</p>
      </footer>
    </div>

  )
}

export default App
