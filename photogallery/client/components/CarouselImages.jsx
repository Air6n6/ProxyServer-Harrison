import React from 'react';
import styles from './css/carousel.css';

class CarouselImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.photos,
            translate: this.props.translate,
            currentPhotoId: this.props.currentPhotoId
        }

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.translate !== prevProps.translate) {
            this.setState({ translate: this.props.translate });
        }

        if (this.props.currentPhotoId !== prevProps.currentPhotoId) {
            this.setState({ currentPhotoId: this.props.currentPhotoId });
        }

        var imageElements = document.getElementsByClassName(styles.carouselimage);

        Array.prototype.forEach.call(imageElements, (element) => {
            if (parseInt(element.name) === this.state.currentPhotoId) {
                element.style.border = '2px solid #424242';
                element.style.opacity = '1';
                element.style.margin = '0px 4px auto 4px';
            } else {
                element.style.border = '0px';
                element.style.opacity = '.7';
                element.style.margin = '2px 4px auto 4px';
            }
        });
    }

    mouseEnter(event) {
        event.target.style.opacity = '1';
    }

    mouseLeave(event) {
        if (parseInt(event.target.name) === this.state.currentPhotoId) {
            event.target.style.border = '2px solid #424242';
            event.target.style.opacity = '1';
            event.target.style.margin = '0px 4px auto 4px';
        } else {
            event.target.style.opacity = '.7';
        }
    }

    handleClick(event) {
        this.props.forward(event);
    }

    render() {
        let photoReel = this.state.photos.map(photo => <img src={photo.url} className={styles.carouselimage} id={photo.id}></img>);
        let slideAnimation = {
            transform: `translateX(${this.state.translate}%)`
        }
       
        return (
            <div className={styles.container}>
                <div className={styles.overlay}></div>
                <div className={styles.carousel} style={slideAnimation}>
                    {this.state.photos.map(photo => <img src={photo.url} className={styles.carouselimage} name={photo.id} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.handleClick}></img>)}
                </div>
            </div>
        );
    }
}

export default CarouselImages;