import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { AppFooter } from "./cmps/AppFooter";
import { AppHeader } from "./cmps/AppHeader";

import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";

export function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/email" element={<EmailIndex />}></Route>
          </Routes>
        </main>

        <AppFooter />
      </section>
    </Router>
  );
}
