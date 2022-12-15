import "./searchItem.css";
import { Link } from "react-router-dom";
const SearchItem = (props) => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{props.item.name}</h1>
        <span className="siDistance">{props.item.distance} Km from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{props.item.description}</span>
        <div>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
      </div>
      <div className="siDetails">
        {props.item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{props.item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">Rs {props.item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotel/${props.item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
