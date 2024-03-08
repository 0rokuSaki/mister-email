import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { AppFooter } from "./cmps/AppFooter";
import { AppHeader } from "./cmps/AppHeader";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { EmailIndex } from "./pages/EmailIndex";

export function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/email/:folder?" element={<EmailIndex />}></Route>
          </Routes>
        </main>

        <AppFooter />
      </section>
    </Router>
  );
}
