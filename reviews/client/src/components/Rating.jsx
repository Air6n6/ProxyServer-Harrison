import React from 'react';
import styled from 'styled-components';

const RatingIcon = (props) => (<span>★</span>)

const RatingBox =styled.div`
    display: flex;
    justify-content: start;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    color: rgb(72, 72, 72);
`;

const Sprite = styled.div`
    display: flex;
    justify-content: left;
    unicode-bidi: bidi-override;
    color: rgb(0, 132, 137);
    font-size: 10px;
    height: 25px;
    width: 25px;
    margin: 0 auto;
    text-shadow: 0px 1px;
  `;
const AvgRating = styled.div`
    display: flex;
    justify-content: left;
    font-size:14px;
    font-weight:500;
  `;
const ReviewCount = styled.div`
    padding-left: 10px;
    font-size:14px;
    font-weight:500;
`;
const ReviewText = styled.div`
    padding-left:5px;
    font-size:14px;
    font-weight:200px;
`;


class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating:4.5,
        }
    }
    // componentDidMount(){
    //     this.calAvg();
    //   }


    // calAvg(){
    //     var reviews = this.props.reviews.slice()
    //     var checkIn = reviews[0].ratings.checkIn
    //     console.log('function is invoked')
    //     // this.setState({rating:checkIn})
    // }


    render() {
        // this.props.reviews.forEach((review)=>{
        //     console.log(review)
        // })
        return (
            <RatingBox>
                <Sprite><RatingIcon/></Sprite>
                <AvgRating>{this.props.reviews.avg.toFixed(2)}</AvgRating>
                <ReviewCount>
                    {this.props.reviews.reviews.length}
                </ReviewCount>
                <ReviewText>Reviews</ReviewText>
            </RatingBox>
        )
    }
}

export default Rating
