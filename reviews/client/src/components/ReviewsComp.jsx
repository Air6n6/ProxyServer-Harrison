import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'Axios';
import Reviews from './Reviews.jsx';
import styled from 'styled-components';
import Rating from './Rating.jsx'
import RatingsBars from './RatingsBars.jsx'
import SearchBar from './SearchBar.jsx'
import Pagination from './Pagination.jsx'


const Wrapper = styled.div`
  display: flex;
  justify-content: center;

`;
const SpecsContainer = styled.div`
  max-width: 525px;
  box-sizing: border-box;

`;

const Head = styled.div`
  display: flex;
  justify-content: left;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.25em;
  color: #484848;
  padding-top: 2px;
  padding-bottom: 2px;
`;
const RatingSearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

class ReviewsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      commsAvg:0,
      checkAvg:0,
      locAvg:0,
      accAvg:0,
      cleanAvg:0,
      valueAvg:0,
      avg:0,
      postsPerPage:7,
      currentPage:1,
      value:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.paginate = this.paginate.bind(this);
  }

  // paginate(pageNumber) {
  //   console.log('this funciton is invoked')
  //   this.setState({currentPage:pageNumber});
  // }

  // const paginate = pageNumber => this.setState({currentPage:pageNumber});

  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(){
    // this.getData();
  }

  getData(){
    Axios.get('http://localhost:3004/reviews')
      .then((res)=>{
        var reviews = res.data[0].reviews
        var commsArr = reviews.map((review) => review.ratings.communication);
        var checkArr = reviews.map((review) => review.ratings.checkIn);
        var locationArr = reviews.map((review) => review.ratings.location);
        var accArr = reviews.map((review) => review.ratings.accuracy);
        var cleanArr = reviews.map((review) => review.ratings.cleanliness);
        var valArr = reviews.map((review) => review.ratings.value);
        var comms = commsArr.reduce((acc,cur)=>(acc+cur))/reviews.length;
        var check = checkArr.reduce((acc,cur)=>(acc+cur))/reviews.length;
        var loc = locationArr.reduce((acc,cur)=>(acc+cur))/reviews.length;
        var acc = accArr.reduce((acc,cur)=>(acc+cur))/reviews.length;
        var clean = cleanArr.reduce((acc,cur)=>(acc+cur))/reviews.length;
        var value = valArr.reduce((acc,cur)=>(acc+cur))/reviews.length;
        var average = (comms + check + loc + acc + clean + value)/6
        this.setState({
          reviews:res.data[0].reviews,
          commsAvg:comms,
          checkAvg:check,
          locAvg:loc,
          accAvg:acc,
          cleanAvg:clean,
          valueAvg:value,
          avg:average,
        })
      })
      .catch((err)=>{
        console.error(err)
      })
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault()
    var list = this.state.reviews;
    var searchValue = this.state.value;
    var newList = list.filter(review => review.body.toLowerCase().includes(this.state.value.toLowerCase()));
    this.setState({reviews: newList})
  }


  render() {

    if(this.state.reviews.length === 0){
      return (
        <div></div>
        )
      }else{

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.reviews.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = (pageNumber) => this.setState({currentPage:pageNumber});

        return (
        <Wrapper>
          <div>
            <SpecsContainer>
              <Head>Reviews</Head>
              <br></br>
              <RatingSearchBarContainer>
                <Rating reviews={this.state}/>
                <SearchBar
                  value={this.state.value}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              </RatingSearchBarContainer>
              <br></br>
              <RatingsBars reviews={this.state}/>
            </SpecsContainer>
            <br></br>
            <Reviews reviews={currentPosts}/>
            <Pagination
              postsPerPage={this.state.postsPerPage}
              totalPosts={this.state.reviews.length}
              paginate={paginate}
            />
          </div>
        </Wrapper>
      )
    }
  }
}

ReactDOM.render(
  <ReviewsComp />,
  document.getElementById('Reviews')
);

export default ReviewsComp;