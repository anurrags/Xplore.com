import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendar,
  faCar,
  faLocation,
  faPerson,
  faPlaneDeparture,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";

const Header = (props) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(" ");
  const [viewOptions, setViewOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [viewCalendar, setViewCalendar] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const calendarViewer = () => {
    if (viewCalendar) setViewCalendar(false);
    else setViewCalendar(true);
  };

  const optionsViewer = () => {
    if (viewOptions) setViewOptions(false);
    else setViewOptions(true);
  };

  const handleOptionClick = (option, operator) => {
    setOptions((prev) => {
      return {
        ...prev,
        [option]:
          operator === "+"
            ? options[option] + 1
            : options[option] >= 1
            ? options[option] - 1
            : options[option],
      };
    });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotel", { state: { destination, dates, options } });
  };
  return (
    <div className="headerDiv">
      <div className="secondBar">
        <div className="stays">
          <a href="/">
            {" "}
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </a>
        </div>
        <div className="flights">
          <a href="/">
            <FontAwesomeIcon icon={faPlaneDeparture} />
            <span>Flights</span>
          </a>
        </div>
        <div className="carRentals">
          <a href="/">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </a>
        </div>
        <div className="attractions">
          <a href="/">
            <FontAwesomeIcon icon={faLocation} />
            <span>Attractions</span>
          </a>
        </div>
        <div className="airportTaxis">
          <a href="/">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </a>
        </div>
      </div>
      <div
        className={
          props.list ? "headerContent hcLarge" : "headerContent hcSmall"
        }
      >
        <h1>Discounts For Everything, Discount for Everyone</h1>
        <p>Get a discount of min 10% on every booking from Xplore.com</p>
        {!user && (
          <Link to="/login">
            <button>Register / Log in</button>
          </Link>
        )}
      </div>
      {props.list && (
        <div className="headerSearchBar">
          <div className="headerSearchItem headerSearchItemFirst">
            <FontAwesomeIcon icon={faBed} />
            <input
              type="text"
              className="headerSearchInput"
              placeholder="City"
              onChange={(e) => {
                setDestination(capitalizeFirstLetter(e.target.value));
              }}
            />
          </div>
          <div className="headerSearchItem headerSearchItemSecond">
            <FontAwesomeIcon icon={faCalendar} />
            {viewCalendar && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="datePicker"
              />
            )}
            <span onClick={calendarViewer}>{`${format(
              dates[0].startDate,
              "dd/MM/yyyy"
            )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
          </div>
          <div className="headerSearchItem headerSearchItemThird">
            <FontAwesomeIcon icon={faPerson} />
            <span
              onClick={optionsViewer}
            >{`${options.adult} Adult · ${options.children} Children · ${options.room} Room`}</span>
            {viewOptions && (
              <div className="optionDiv">
                <div className="optionAdult option">
                  Adult:
                  <button
                    className="optionCounter btnDecrease"
                    onClick={() => handleOptionClick("adult", "-")}
                  >
                    -
                  </button>
                  <span>{options.adult}</span>
                  <button
                    className="optionCounter btnIncrease"
                    onClick={() => handleOptionClick("adult", "+")}
                  >
                    +
                  </button>
                </div>
                <div className="optionChildren option">
                  Children:
                  <button
                    className="optionCounter btnDecrease"
                    onClick={() => handleOptionClick("children", "-")}
                  >
                    -
                  </button>
                  <span>{options.children}</span>
                  <button
                    className="optionCounter btnIncrease"
                    onClick={() => handleOptionClick("children", "+")}
                  >
                    +
                  </button>
                </div>
                <div className="optionRoom option">
                  Room:
                  <button
                    className="optionCounter btnDecrease"
                    onClick={() => handleOptionClick("room", "-")}
                  >
                    -
                  </button>
                  <span>{options.room}</span>
                  <button
                    className="optionCounter btnIncrease"
                    onClick={() => handleOptionClick("room", "+")}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
          <button className="headerSearchBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
