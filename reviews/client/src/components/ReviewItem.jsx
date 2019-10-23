import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ReviewBox = styled.div`
    padding-bottom: 30px;
    box-sizing: border-box;
    color: rgb(72, 72, 72);
    display: block;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    font-size:14px;
    line-height: 20.02px;
    text-size-adjust: 100%;
`;
const ProfileBox = styled.div`
    padding: 5px;
    display: flex;
`;
const Photo = styled.img`
    border-radius: 50%;
    box-sizing: border-box;
    height: 47.9861px;
    width: 47.9861px;
    padding: 5px;

`;
const CustomerName = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    overflow-wrap: break-word;
`;
const Date = styled.div`
    font-size: 12px;
`;

const BodyBox = styled.div`
font-weight: 200;
margin-top: 16px;
overflow-wrap: break-word;
`;






const ReviewItem = (props) => {
    return (
        <ReviewBox>
            <ProfileBox>
                <Photo src={props.review.customer.customerPhoto}></Photo>

                <div>
                    <CustomerName>{props.review.customer.customerName}</CustomerName>

                    <Date>{moment(props.review.bodyDate).format("MMMM YYYY")}</Date>
                </div>

            </ProfileBox>

            <BodyBox>
                <div>{props.review.body}</div>
            </BodyBox>
        </ReviewBox>
    )
}

export default ReviewItem;