import {render} from 'preact'
import {LocationProvider, Router, Route} from 'preact-iso'

import {Header} from './components/Header.jsx'
import {Footer} from './components/Footer.jsx'
import {Home} from './pages/Home/index.jsx'
import {DashBoard} from './pages/DashBoard/index.jsx'
import {NotFound} from './pages/_404.jsx'
import './style.css'

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={DashBoard} />
          <Route default component={NotFound} />
        </Router>
      </main>
      <Footer />
    </LocationProvider>
  )
}

render(<App />, document.getElementById('app'))
