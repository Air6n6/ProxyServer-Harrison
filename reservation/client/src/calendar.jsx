import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Day from './day';

const Wrapper = styled.div`
  border: 1px solid #dedede;
  background: white;
  z-index: 1;
  position: absolute;
  width: 350px;
  margin: 10px;
  padding: 10px 0px;
  text-align: center;
  display: grid;
  grid-template-rows: 20% 1fr 20%;
  grid-template-columns: 10% 1fr 10%;

  :after {
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 1px solid #dedede;
    border-right: 0px solid #dedede;
    border-bottom: 0px solid #dedede;
    border-left: 1px solid #dedede;
    bottom: 100%;
    left: ${props => (props.cal === 'checkIn' ? '10%' : '60%')};
    content: '';
    transform: rotate(45deg);
    margin-bottom: -5px;
    background: white;
  }

  h2 {
    grid-row: 1;
    grid-column: 2;
    justify-self: center;
    align-self: center;
    margin: 20px 0px;
    font-size: 18px;
    font-weight: 700;
  }

  .clear {
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    grid-row: 3;
    grid-column: 2;
    margin: 20px 0;
    align-self: start;
    justify-self: end;
    border: none;
    outline: none;
    color: #007e82;

    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  grid-row: 1;
  grid-column: 2;
  padding: 0;
  height: 35px;
  width: 40px;
  border-radius: 4px;
  border: 1px solid #dedede;
  text-align: center;
`;

const LeftButton = styled(Button)`
  justify-self: start;
`;

const RightButton = styled(Button)`
  justify-self: right;
`;

const Table = styled.table`
  grid-row: 2;
  grid-column: 2;
  margin: 10px 0;
  text-align: center;
  empty-cells: hide;
  border-collapse: separate;
  empty-cells: hide;

  th {
    height: 20px;
    font-size: 12px;
  }

  td {
    border: 0.2px solid #dedede;
    height: 40px;
    width: 40px;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    font-weight: 700;
  }
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month:
        this.props.checkIn !== 'Check-in'
          ? moment(this.props.checkIn)
          : moment(),
      weekdays: moment.weekdaysMin(),
      today: moment().format('MMMM-YYYY-DD'),
      unavailableDays: [],
      hoverDays: [],
      selectedDays: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDaysHover = this.handleDaysHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.checkUnavailable = this.checkUnavailable.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    this.checkUnavailable();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  checkUnavailable() {
    let unavailableDays = [];
    this.props.reservations.forEach(rsvp => {
      for (let k = 0; k < rsvp.totalNights; k++) {
        let day = moment(rsvp.checkIn, 'YYYY-MM-DD')
          .add(k, 'days')
          .format('MM/DD/YYYY');
        unavailableDays.push(day);
      }
    });
    if (this.props.cal === 'checkOut') {
      const selected = moment(this.props.checkIn).day();
      let minDays =
        selected >= 1 && selected <= 5
          ? this.props.minStayWeekday
          : this.props.minStayWeekend;
      if (minDays > 1) {
        for (var k = 1; k < minDays; k++) {
          let day = moment(this.props.checkIn)
            .add(k, 'days')
            .format('MM/DD/YYYY');
          unavailableDays.push(day);
        }
      }
    }
    this.setState({ unavailableDays });
  }

  handleClick(e) {
    let node = this.node;
    if (!node.contains(e.target)) {
      this.props.displayCal('');
    }
  }

  handleMonthClick(arrow) {
    let month =
      arrow === 'left'
        ? this.state.month.subtract(1, 'month')
        : this.state.month.add(1, 'month');

    this.setState({ month });
  }

  handleDaysHover(month, day, cal) {
    if (
      this.props.checkIn !== 'Check-in' &&
      this.props.checkOut === 'Check-out'
    ) {
      const hovered = moment(`${month} ${day}`, 'MMMM-YYYY-DD');
      const checkIn = moment(this.props.checkIn);
      let hoverDays = [];

      if (hovered.isSame(checkIn, 'day')) {
        let minDays =
          checkIn.day() >= 1 && checkIn.day() <= 5
            ? this.props.minStayWeekday
            : this.props.minStayWeekend;

        if (minDays > 1) {
          for (let k = 1; k <= minDays; k++) {
            let day = checkIn
              .clone()
              .add(k, 'days')
              .format('MM/DD/YYYY');
            hoverDays.push(day);
          }
        }
      } else if (cal === 'checkOut') {
        if (hovered.isAfter(checkIn)) {
          const diff = hovered.diff(checkIn, 'days');
          for (let k = 1; k <= diff; k++) {
            let day = checkIn
              .clone()
              .add(k, 'days')
              .format('MM/DD/YYYY');
            hoverDays.push(day);
          }
        }
      }
      this.setState({ hoverDays });
    }
  }

  handleMouseLeave() {
    const hoverDays = [];
    this.setState({ hoverDays });
  }

  createDays(month) {
    const firstDay = month.startOf('month').format('d');
    const lastDate = month.endOf('month').format('D');
    const days = [];
    const rows = [];
    let start = 0;
    let end = 7;

    for (let k = 0; k < firstDay; k++) {
      days.push(<Day key={`b${k}`} day="" />);
    }

    for (let k = 1; k <= lastDate; k++) {
      let day = moment(`${month.format('MMMM YYYY')} ${k}`, 'MMMM-YYYY-DD');
      let isCheckIn =
        this.props.checkIn !== 'Check-in'
          ? day.isSame(this.props.checkIn)
          : false;

      let hasDay = this.state.unavailableDays.includes(
        day.format('MM/DD/YYYY')
      );
      let isHover = this.state.hoverDays.includes(day.format('MM/DD/YYYY'));
      let isSelected = this.props.selectedDays.includes(
        day.format('MM/DD/YYYY')
      );
      let unavailable =
        day.isBefore(this.state.today) ||
        day.isSame(this.state.today) ||
        hasDay;

      if (this.props.checkIn !== 'Check-in' && this.props.cal === 'checkOut') {
        const nextRSVPs = this.props.reservations.filter(rsvp =>
          moment(rsvp.checkIn, 'YYYY-MM-DD').isAfter(moment(this.props.checkIn))
        );
        const rsvpdate = nextRSVPs[0] ? nextRSVPs[0].checkIn : null;
        const hasRSVPd = rsvpdate ? day.isAfter(rsvpdate) : false;

        unavailable = day.isBefore(this.props.checkIn) || hasRSVPd || hasDay;
      }

      days.push(
        <Day
          isCheckIn={isCheckIn}
          isHover={isHover}
          isSelected={isSelected}
          cal={this.props.cal}
          handleDateClick={this.props.handleDateClick}
          checkSelected={this.checkSelected}
          handleDaysHover={this.handleDaysHover}
          handleCheckOutHover={this.handleCheckOutHover}
          handleMouseLeave={this.handleMouseLeave}
          key={k}
          month={month.format('MMMM YYYY')}
          day={k}
          unavailable={unavailable}
        />
      );
    }

    for (let k = 0; k < 5; k++) {
      let row = [];
      for (let i = start; i < end; i++) {
        days[i] ? row.push(days[i]) : null;
      }
      start = end;
      end = end + 7;
      row = <tr key={`r${k}`}>{row}</tr>;
      rows.push(row);
    }
    return rows;
  }

  render() {
    return (
      <Wrapper ref={node => (this.node = node)} cal={this.props.cal}>
        <LeftButton
          onClick={() => {
            this.handleMonthClick('left');
          }}
        >
          {' '}
          <svg width="20px" height="20px">
            <line
              x1="0"
              x2="20"
              y1="10"
              y2="10"
              stroke="black"
              strokeWidth=".70"
              strokeLinecap="butt"
            />
            <line />
            <line
              x1="0"
              x2="5"
              y1="10"
              y2="15"
              stroke="black"
              strokeWidth=".70"
              strokeLinecap="butt"
            ></line>
            <line
              x1="0"
              x2="5"
              y1="10"
              y2="5"
              stroke="black"
              strokeWidth=".70"
              strokeLinecap="butt"
            ></line>
          </svg>
        </LeftButton>
        <h2>{this.state.month.format('MMMM YYYY')}</h2>
        <RightButton
          onClick={() => {
            this.handleMonthClick('right');
          }}
        >
          <svg width="20px" height="20px">
            <line
              x1="0"
              x2="20"
              y1="10"
              y2="10"
              stroke="black"
              strokeWidth=".70"
              strokeLinecap="butt"
            />
            <line />
            <line
              x1="20"
              x2="15"
              y1="10"
              y2="15"
              stroke="black"
              strokeWidth=".70"
              strokeLinecap="butt"
            ></line>
            <line
              x1="20"
              x2="15"
              y1="10"
              y2="5"
              stroke="black"
              strokeWidth=".70"
              strokeLinecap="butt"
            ></line>
          </svg>
        </RightButton>
        <Table>
          <thead>
            <tr>
              {this.state.weekdays.map(day => (
                <th key={`wd${day}`}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{this.createDays(this.state.month)}</tbody>
        </Table>
        {this.props.checkIn !== 'Check-in' ||
        this.props.checkOut !== 'Check-out' ? (
          <button
            className="clear"
            onClick={() => this.props.handleClearClick(this.checkUnavailable)}
          >
            <span>Clear Dates</span>
          </button>
        ) : null}
      </Wrapper>
    );
  }
}

export default Calendar;
