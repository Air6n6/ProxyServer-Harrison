import React from 'react';
import Calendar from './calendar';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5px 0px;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 3px;
  font-size: 12px;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  border: 1px solid #dedede;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 300;
  color: ${props =>
    props.checkIn === 'Check-in' || props.checkOut === 'Check-out'
      ? '#707070'
      : '#454545'};
  width: 135px;
  margin: 5px;
  padding: 5px;
  border: none;
  ${props =>
    (props.cal === 'checkOut' && props.checkOut) ||
    (props.cal === 'checkIn' && props.checkIn)
      ? `background-color: #a0f2ea;
  outline: none;
  border-radius: 3px;`
      : null}
`;

const Dates = props => (
  <Wrapper>
    <Label>Dates</Label>
    <InputWrapper>
      <Input
        cal={props.cal}
        checkIn={props.checkIn}
        onClick={() => {
          props.displayCal('checkIn');
        }}
        type="text"
        readOnly
        value={props.checkIn}
      />
      <svg width="30px" height="20px">
        <line
          x1="0"
          x2="30"
          y1="10"
          y2="10"
          stroke="black"
          strokeWidth=".70"
          strokeLinecap="butt"
        />
        <line />
        <line
          x1="20"
          x2="30"
          y1="18"
          y2="10"
          stroke="black"
          strokeWidth=".70"
          strokeLinecap="butt"
        ></line>
        <line
          x1="30"
          x2="20"
          y1="10"
          y2="2"
          stroke="black"
          strokeWidth=".70"
          strokeLinecap="butt"
        ></line>
      </svg>
      <Input
        cal={props.cal}
        checkOut={props.checkOut}
        onClick={() => {
          props.displayCal('checkOut');
        }}
        type="text"
        readOnly
        value={props.checkOut}
      />
    </InputWrapper>
    {props.cal === 'checkIn' || props.cal === 'checkOut' ? (
      <Calendar
        reservations={props.reservations}
        checkIn={props.checkIn}
        checkOut={props.checkOut}
        selectedDays={props.selectedDays}
        cal={props.cal}
        handleDateClick={props.handleDateClick}
        handleClearClick={props.handleClearClick}
        displayCal={props.displayCal}
        minStayWeekday={props.minStayWeekday}
        minStayWeekend={props.minStayWeekend}
      />
    ) : null}
  </Wrapper>
);

export default Dates;
