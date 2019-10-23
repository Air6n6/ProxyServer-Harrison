import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './css/app.css';
import Carousel from './Carousel.jsx';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            carousel: false,
            clickedPhoto: 0
        }

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/listing/2')
            .then((response) => {
                this.setState({ photos: response.data  })
            });
    }

    onMouseEnter(event) {
        var imageElements = document.getElementsByClassName(styles.gallery__item);

        Array.prototype.forEach.call(imageElements, (element) => {
            if (element.className.includes(event.target.className)) {
                element.style.border = '1px solid #018488';
            } else {
                element.style.filter = 'brightness(70%)';
            }
        });
    }

    onMouseLeave(event) {
        var imageElements = document.getElementsByClassName(styles.gallery__item);

        Array.prototype.forEach.call(imageElements, (element) => {
            element.removeAttribute("style");
        });
    }

    onClick(event) {
        this.setState({ carousel: true, clickedPhoto: parseInt(event.target.name) });
    }

    handleClose(event) {
        this.setState({ carousel: false });
    }

    render() {
        if (this.state.photos.length === 0) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div>
                    <Carousel show={this.state.carousel} photos={this.state.photos} close={this.handleClose} id={this.state.clickedPhoto} />
                    <div className={styles.gallery}>
                        <div onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={[styles.gallery__item, styles.gallery__item1].join(' ')}>
                            <img src={this.state.photos[0].url} className={styles.gallery__item1} name={this.state.photos[0].id} alt="Image 1" />
                        </div>
                        <div onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={[styles.gallery__item, styles.gallery__item2].join(' ')}>
                            <img src={this.state.photos[1].url} className={styles.gallery__item2} name={this.state.photos[1].id} alt="Image 2" />
                        </div>
                        <div onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={[styles.gallery__item, styles.gallery__item3].join(' ')}>
                            <img src={this.state.photos[2].url} className={styles.gallery__item3} name={this.state.photos[2].id} alt="Image 3" />
                        </div>
                        <div onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={[styles.gallery__item, styles.gallery__item4].join(' ')}>
                            <img src={this.state.photos[3].url} className={styles.gallery__item4} name={this.state.photos[3].id} alt="Image 4" />
                        </div>
                        <div onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={[styles.gallery__item, styles.gallery__item5].join(' ')}>
                            <img src={this.state.photos[4].url} className={styles.gallery__item5} name={this.state.photos[4].id} alt="Image 5" />
                        </div>
                    </div>
                </div>
            );
        }

    }
}

ReactDOM.render(<Gallery />, document.getElementById("Gallery"));

export default Gallery;