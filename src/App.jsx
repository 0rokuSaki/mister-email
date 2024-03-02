import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'

import { Home } from "./pages/Home";

export function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader/>

        <main className="container">
          <Home />
        </main>

        <AppFooter/>
      </section>
    </Router>
  );
}
