import React from 'react';
import styled from 'styled-components';

const RatingBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: rgb(72, 72, 72);
`;

const RatingBarBoxLeft =styled.div`
    display: flex;
    flex-direction: column;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    font-size:12px;
`;

const RatingBarBoxRight =styled.div`
    display: flex;
    flex-direction: column;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    font-size:12px;
`;

const RatingLineScore = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-left: 70px;
    `;


const RatingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    `;
const RatingsBarStyle = styled.div`
    display: flex;
    align-self: center;
    height: 3px;
    width: 80px;
    border-radius: 60px;
    // border: 1px solid #333;
    background-color: var(--color-accent-light-gray, #D8D8D8) !important;
  `;

const BarFiller = styled.div`
    background: #1DA598;
    height: 100%;
    border-radius: inherit;
    transition: width .2s ease-in;
  `;

  const Score = styled.div`
  padding-left: 5px;
`;


  class RatingsBars extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        percentage:75
      }
    }



    render() {
      return (
          <RatingBox>
            <RatingBarBoxLeft>
                <RatingContainer>
                    <div>Accuracy</div>
                    <RatingLineScore>
                        <RatingsBarStyle><BarFiller style={{ width: `${this.props.reviews.accAvg/5*100}%` }}></BarFiller></RatingsBarStyle>
                        <Score>{this.props.reviews.accAvg.toFixed(1)}</Score>
                    </RatingLineScore>
                </RatingContainer>

                <RatingContainer>
                    <div>Value</div>
                    <RatingLineScore>
                        <RatingsBarStyle><BarFiller style={{ width: `${this.props.reviews.valueAvg/5*100}%` }}></BarFiller></RatingsBarStyle>
                        <Score>{this.props.reviews.valueAvg.toFixed(1)}</Score>
                    </RatingLineScore>
                </RatingContainer>

                <RatingContainer>
                    <div>Location</div>
                    <RatingLineScore>
                        <RatingsBarStyle><BarFiller style={{ width: `${this.props.reviews.locAvg/5*100}%` }}></BarFiller></RatingsBarStyle>
                        <Score>{this.props.reviews.locAvg.toFixed(1)}</Score>
                    </RatingLineScore>
                </RatingContainer>
            </RatingBarBoxLeft>

            <RatingBarBoxRight>
                <RatingContainer>
                    <div>Cleanliness</div>
                    <RatingLineScore>
                        <RatingsBarStyle><BarFiller style={{ width: `${this.props.reviews.cleanAvg/5*100}%` }}></BarFiller></RatingsBarStyle>
                        <Score>{this.props.reviews.cleanAvg.toFixed(1)}</Score>
                    </RatingLineScore>
                </RatingContainer>

                <RatingContainer>
                    <div>Communication</div>
                    <RatingLineScore>
                        <RatingsBarStyle><BarFiller style={{ width: `${this.props.reviews.commsAvg/5*100}%` }}></BarFiller></RatingsBarStyle>
                        <Score>{this.props.reviews.commsAvg.toFixed(1)}</Score>
                    </RatingLineScore>
                </RatingContainer>

                <RatingContainer>
                    <div>Check-in</div>
                    <RatingLineScore>
                        <RatingsBarStyle><BarFiller style={{ width: `${this.props.reviews.checkAvg/5*100}%` }}></BarFiller></RatingsBarStyle>
                        <Score>{this.props.reviews.checkAvg.toFixed(1)}</Score>
                    </RatingLineScore>
                </RatingContainer>
            </RatingBarBoxRight>
          </RatingBox>
      )
    }
  }

  export default RatingsBars;