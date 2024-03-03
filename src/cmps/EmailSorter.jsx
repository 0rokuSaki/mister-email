import upArrowImgUrl from "../assets/imgs/up-arrow.png";
import downArrowImgUrl from "../assets/imgs/down-arrow.png";

export function EmailSorter({ onSortButtonClick, orderBy, order }) {
  const dateBtnDynClass = orderBy === "date" ? "active" : "";
  const subjectBtnDynClass = orderBy === "subject" ? "active" : "";
  const nameBtnDynClass = orderBy === "name" ? "active" : "";
  const dynImg = order === "asc" ? upArrowImgUrl : downArrowImgUrl;
  return (
    <div className="email-sorter">
      <button
        className={dateBtnDynClass}
        onClick={() => onSortButtonClick("date")}
      >
        Date {orderBy === "date" && <img src={dynImg} alt="" />}
      </button>
      <button
        className={subjectBtnDynClass}
        onClick={() => onSortButtonClick("subject")}
      >
        Subject {orderBy === "subject" && <img src={dynImg} alt="" />}
      </button>
      <button
        className={nameBtnDynClass}
        onClick={() => onSortButtonClick("name")}
      >
        Name {orderBy === "name" && <img src={dynImg} alt="" />}
      </button>
    </div>
  );
}
