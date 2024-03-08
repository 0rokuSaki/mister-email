import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { AppFooter } from "./cmps/AppFooter";
import { AppHeader } from "./cmps/AppHeader";

export function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <AppFooter />
      </section>
    </Router>
  );
}
