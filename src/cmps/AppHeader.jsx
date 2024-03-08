import { Link } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="main-logo-wrapper">
        <button className="main-menu-button">Main Menu</button>
        <Link>
          <h1>Gmail</h1>
        </Link>
      </div>

      <div className="search-bar-wrapper">
        <form action="">
          <button>Search</button>
          <input type="text" name="" id="" placeholder="Search mail"/>
        </form>
      </div>
    </header>
  );
}
