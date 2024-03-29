import { NavLink, useLocation } from "react-router-dom";
import { eventBusService } from "../services/event-bus.service";
import { useState, useEffect } from "react";

export function AppHeader() {
  const { pathname } = useLocation();
  const [searchText, setSearchText] = useState("");

  const inEmail = pathname.toLowerCase().includes("email");
  const dynClass = inEmail ? "active" : "";

  useEffect(() => {
    eventBusService.on("setSearchText", setSearchText);

    return () => {
      eventBusService.off("setSearchText", setSearchText);
    };
  }, []);

  function onChange(ev) {
    const { value } = ev.target;
    setSearchText(value);
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    eventBusService.emit("setFilterBy", (prevFilter) => {
      return { ...prevFilter, txt: searchText };
    });
  }

  return (
    <header className="app-header">
      <div className="main-logo-wrapper">
        {inEmail && <button className="main-menu-button">Main Menu</button>}
        {inEmail && <h1>Gmail</h1>}
        {!inEmail && <h1>Mister Email</h1>}
      </div>

      {inEmail && (
        <div className="search-bar-wrapper">
          <form onSubmit={onSubmitFilter}>
            <button>Search</button>
            <input
              type="text"
              value={searchText}
              name=""
              id=""
              placeholder="Search mail"
              onChange={onChange}
            />
          </form>
        </div>
      )}

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/email/inbox" className={dynClass}>
          E-Mail
        </NavLink>
      </nav>
    </header>
  );
}
