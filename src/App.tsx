import './App.css'
import { ShowList } from './components/showlist/showlist'

function App() {
  return (
    <div className="App">
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
