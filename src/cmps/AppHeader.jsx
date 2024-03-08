import { NavLink, useLocation } from "react-router-dom";

export function AppHeader() {
  const { pathname } = useLocation();

  const inEmail = pathname.toLowerCase().includes("email");
  const dynClass = inEmail ? "active" : "";
  return (
    <header className="app-header">
      <div className="main-logo-wrapper">
        {inEmail && <button className="main-menu-button">Main Menu</button>}
        {inEmail && <h1>Gmail</h1>}
        {!inEmail && <h1>Mister Email</h1>}
      </div>

      {inEmail && (
        <div className="search-bar-wrapper">
          <form action="">
            <button>Search</button>
            <input type="text" name="" id="" placeholder="Search mail" />
          </form>
        </div>
      )}

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/email/inbox" className={dynClass}>E-Mail</NavLink>
      </nav>
    </header>
  );
}
