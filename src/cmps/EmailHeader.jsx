import hamburgerMenuImageUrl from "../assets/imgs/hamburger-menu.png";
import magnifyingGlassImageUrl from "../assets/imgs/magnifying-glass.png";

export function EmailHeader() {
  return (
    <header className="email-header">
      <span className="logo-wrapper">
        <button>
          <img src={hamburgerMenuImageUrl} alt="" />
        </button>
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
          alt=""
        />
      </span>
      <span className="search-bar">
        <form action="">
          <button>
            <img src={magnifyingGlassImageUrl} alt="" />
          </button>
          <input type="text" placeholder="Search Mail"/>
        </form>
      </span>
    </header>
  );
}
