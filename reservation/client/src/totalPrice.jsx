import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 13px;

  section {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    margin 0px 10px;
    border-bottom: 1px solid #dedede;
  }

  .total {
    border: none;
    font-weight: 500;
  }
`;

const TotalPrice = props => {
  let feesNTaxes = props.taxes * props.newPrice;

  return (
    <Wrapper>
      <section>
        <span>{`$${props.basePrice} x ${props.nights} nights`}</span>
        <span>${props.newPrice}</span>
      </section>
      <section>
        <span>Service fee</span> <span>${props.serviceFee}</span>
      </section>
      {props.cleaningFee > 0 ? (
        <section>
          <span>Cleaning fee</span> <span>${props.cleaningFee}</span>
        </section>
      ) : null}
      <section>
        <span>Occupancy taxes and fees</span> <span>${feesNTaxes}</span>
      </section>
      <section className="total">
        <span>Total</span>
        <span>${props.newPrice + props.serviceFee + feesNTaxes}</span>
      </section>
    </Wrapper>
  );
};

export default TotalPrice;
