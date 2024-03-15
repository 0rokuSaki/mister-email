import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { eventBusService } from "../services/event-bus.service";
import { useState, useEffect } from "react";

export function AppHeader({filterBy}) {
  const { pathname } = useLocation();
  const [searchText, setSearchText] = useState("");
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const navigate = useNavigate();

  const inEmail = pathname.toLowerCase().includes("email");
  const dynClass = inEmail ? "active" : ""; // Value to determine wether to display search bat or not

  useEffect(() => {
    const unsubscribe = eventBusService.on("setSearchText", setSearchText);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    eventBusService.emit("onSetFilter", filterByToEdit);
  }, [filterByToEdit]);

  function onChange(ev) {
    const { value } = ev.target;
    setSearchText(value);
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    navigate("/email");
    setFilterByToEdit((prevFilter) => { return {...prevFilter, txt: searchText}});
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
        <NavLink to="/email" className={dynClass}>
          E-Mail
        </NavLink>
      </nav>
    </header>
  );
}
