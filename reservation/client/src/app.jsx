import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import request from '../request';
import Dates from './dates';
import Guests from './guests';
import TotalPrice from './totalPrice';
import ReactDOM from 'react-dom';

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid #dedede;
  font-family: 'Nunito Sans', sans-serif;
  color: #454545;
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-columns: 100%;
  width: 400px;
  float: right;
  padding: 25px;
  margin: 20px 30px;
  grid-gap: 15px;

  .minStay {
    font-size: 13px;
    padding: 5px 0px;
  }

  .notice {
    justify-self: center;
    font-size: 12px;
    font-weight: 500;
  }
`;

const Price = styled.section`
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  padding-bottom: 20px;
  justify-self: start;
  border-bottom: 1px solid #dedede;
`;

const Rate = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-right: 2px;
`;

const ReserveButton = styled.button`
  background-color: #f25764;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 16px
  font-weight: 500;
  padding: 10px;
  margin: 5px;
`;

export default class Reservations extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDays: [],
      reservations: [],
      basePrice: 0,
      newPrice: 0,
      cleaningFee: 0,
      discount: 0,
      serviceFee: 0,
      taxes: 0,
      maxGuest: 0,
      guestAmt: 1,
      adults: 1,
      children: 0,
      infants: 0,
      minStayWeekday: 0,
      minStayWeekdend: 0,
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      nights: 0,
      instantBooked: true,
      cal: '',
      displayDropdown: false,
      displayTotal: false
    };

    this.displayCal = this.displayCal.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
  }

  componentDidMount() {
    request.getReservations(listing => {
      this.setState(listing);
    });
  }

  displayCal(cal) {
    this.setState({ cal });
  }

  handleDateClick(cal, month, date) {
    const selected = moment(`${month} ${date}`, 'MMMM-YYYY-DD').format(
      'MM/DD/YYYY'
    );
    let selectedDays = [];

    if (cal === 'checkIn') {
      const checkIn = selected;
      const checkOut = 'Check-out';
      selectedDays.unshift(selected);
      const cal = 'checkOut';
      this.setState({ checkIn, checkOut, cal, selectedDays });
    } else {
      const checkOut = selected;
      const cal = '';
      let diff = moment(checkOut).diff(this.state.checkIn, 'days');
      selectedDays.push(this.state.checkIn);
      for (let k = 1; k <= diff; k++) {
        let day = moment(this.state.checkIn)
          .add(k, 'days')
          .format('MM/DD/YYYY');
        selectedDays.push(day);
      }
      this.setState({ checkOut, cal, selectedDays }, this.calculatePrice);
    }
  }

  handleDropdownClick(boo) {
    this.setState({ displayDropdown: boo });
  }

  handleGuestClick(guest, op) {
    const { adults, children, infants, guestAmt, maxGuest } = this.state;

    if (guestAmt <= maxGuest) {
      if (adults >= 1 && guest === 'adults') {
        if (op === 'plus' && guestAmt < maxGuest) {
          this.setState({ adults: adults + 1, guestAmt: guestAmt + 1 });
        } else if (op === 'minus' && adults >= 2) {
          this.setState({ adults: adults - 1, guestAmt: guestAmt - 1 });
        }
      }

      if (children >= 0 && guest === 'children') {
        if (op === 'plus' && guestAmt < maxGuest) {
          this.setState({ children: children + 1, guestAmt: guestAmt + 1 });
        } else if (op === 'minus' && children >= 1) {
          this.setState({ children: children - 1, guestAmt: guestAmt - 1 });
        }
      }
    }

    if (infants >= 0 && guest === 'infants') {
      if (op === 'plus') {
        this.setState({ infants: infants + 1 });
      } else if (op === 'minus' && infants >= 1) {
        this.setState({ infants: infants - 1 });
      }
    }
  }

  handleClearClick(callback) {
    const checkOut = 'Check-out';
    const checkIn = 'Check-in';
    const selectedDays = [];
    const nights = 0;
    const displayTotal = false;

    this.setState(
      { checkOut, checkIn, selectedDays, nights, displayTotal },
      callback
    );
  }

  checkMinStay() {
    let { checkIn, checkOut, minStayWeekday, minStayWeekend } = this.state;
    const defaultText = (
      <div className="minStay">Add dates for exact pricing</div>
    );
    if (checkIn !== 'Check-in') {
      if (checkOut !== 'Check-out') {
        return null;
      }

      checkIn = moment(checkIn).day();
      let minDays =
        checkIn >= 1 && checkIn <= 5 ? minStayWeekday : minStayWeekend;

      if (minDays > 0) {
        return <div className="minStay">Minimum stay: {minDays} nights</div>;
      } else {
        return defaultText;
      }
    } else {
      return defaultText;
    }
  }

  calculatePrice() {
    const { basePrice, checkIn, checkOut } = this.state;
    let displayTotal = true;
    let newPrice;
    let nights;
    if (checkOut !== 'Check-out' && checkIn !== 'Check-in') {
      nights = moment(checkOut).diff(moment(checkIn), 'days');
      newPrice = nights * basePrice;
    }

    this.setState({ newPrice, nights, displayTotal });
  }

  render() {
    return (
      <Wrapper>
        <Price>
          <Rate>${this.state.basePrice}</Rate>
          per night
        </Price>
        {this.checkMinStay()}
        <Dates
          reservations={this.state.reservations}
          checkIn={this.state.checkIn}
          checkOut={this.state.checkOut}
          selectedDays={this.state.selectedDays}
          displayCal={this.displayCal}
          cal={this.state.cal}
          handleDateClick={this.handleDateClick}
          handleClearClick={this.handleClearClick}
          minStayWeekday={this.state.minStayWeekday}
          minStayWeekdend={this.state.minStayWeekdend}
        />
        <Guests
          guestAmt={this.state.guestAmt}
          displayDropdown={this.state.displayDropdown}
          handleDropdownClick={this.handleDropdownClick}
          handleGuestClick={this.handleGuestClick}
          adults={this.state.adults}
          children={this.state.children}
          infants={this.state.infants}
          maxGuest={this.state.maxGuest}
        />
        {this.state.displayTotal ? (
          <TotalPrice
            basePrice={this.state.basePrice}
            newPrice={this.state.newPrice}
            nights={this.state.nights}
            serviceFee={this.state.serviceFee}
            taxes={this.state.taxes}
            cleaningFee={this.state.cleaningFee}
          />
        ) : null}
        <ReserveButton>Reserve</ReserveButton>
        <div className="notice">You won't be charged yet</div>
      </Wrapper>
    );
  }
}

ReactDOM.render(<Reservations />, document.getElementById('Reservation'));