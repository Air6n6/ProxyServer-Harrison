import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import styled from 'styled-components';

const ReviewsBox = styled.div`
    max-width: 594px;
    box-sizing: border-box;
    color: rgb(72, 72, 72);
    display: block;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    font-size:14px;
    line-height: 20.02px;
    text-size-adjust: 100%;
    margin-top: 16px;

`;

const Border = styled.div`
    box-sizing:border-box;
    color:rgb(72, 72, 72);
    display:block;
    font-family:Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
    font-size:14px;
    height:0.996094px;
    line-height:20.02px;
    margin-bottom:24px;
    margin-top:24px;
    text-size-adjust:100%;
    width:594.023px;
    line-height: 1.43;
    color: #484848;
`;


const Reviews = (props) => {
    return (
        <div>
            <ReviewsBox>
                {props.reviews.map((review,i)=>
                <ReviewItem review={review} key={i}/>)}
            </ReviewsBox>
            <Border></Border>
        </div>
    )
}

export default Reviews;