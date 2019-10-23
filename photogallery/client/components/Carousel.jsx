import React from 'react';
import styles from './css/carousel.css';
import CarouselImages from './CarouselImages.jsx';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.photos,
            currentPhotoId: this.props.id,
            currentPhoto: this.props.photos[0].url,
            translate: 0
        }

        this.photoBack = this.photoBack.bind(this);
        this.photoForward = this.photoForward.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            for (var i = 0; i < this.state.photos.length; i++) {
                let newTranslate;
                
                if (this.props.id - this.state.photos[0].id === 0 || this.props.id - this.state.photos[0].id === 1) {
                    newTranslate = 0;
                } else if (this.props.id - this.state.photos[0].id === this.state.photos.length - 1 || this.props.id - this.state.photos[0].id === this.state.photos.length - 2) {
                    newTranslate = this.state.photos.length - 3;
                } else {
                    newTranslate = (this.props.id - this.state.photos[0].id) - 1;
                }

                if (this.state.photos[i].id === this.props.id) {
                    this.setState({ currentPhotoId: this.state.photos[i].id, currentPhoto: this.state.photos[i].url, translate: (newTranslate) * -22.8 });
                }
            }
        } else if (this.state.currentPhotoId !== prevState.currentPhotoId) {
            for (var i = 0; i < this.state.photos.length; i++) {
                let newTranslate;
                
                if (this.state.currentPhotoId - this.state.photos[0].id === 0 || this.state.currentPhotoId - this.state.photos[0].id === 1) {
                    newTranslate = 0;
                } else if (this.state.currentPhotoId - this.state.photos[0].id === this.state.photos.length - 1 || this.state.currentPhotoId - this.state.photos[0].id === this.state.photos.length - 2) {
                    newTranslate = this.state.photos.length - 3;
                } else {
                    newTranslate = (this.state.currentPhotoId - this.state.photos[0].id) - 1;
                }

                if (this.state.photos[i].id === this.state.currentPhotoId) {
                    this.setState({ currentPhotoId: this.state.photos[i].id, currentPhoto: this.state.photos[i].url, translate: (newTranslate) * -22.8 });
                }
            }
        }
    }

    photoBack(event) {
        if (this.state.currentPhotoId === this.state.photos[0].id) {
            this.setState({ currentPhotoId: this.state.photos[this.state.photos.length - 1].id });
        } else {
            this.setState({ currentPhotoId: this.state.currentPhotoId - 1 });
        }
    }

    photoForward(event) {
        if (event.target.name) {
            this.setState({ currentPhotoId: parseInt(event.target.name) });
        } else if (this.state.currentPhotoId === this.state.photos[this.state.photos.length - 1].id) {
            this.setState({ currentPhotoId: this.state.photos[0].id });
        } else {
            this.setState({ currentPhotoId: this.state.currentPhotoId + 1 });
        }
    }

    close(event) {
        this.props.close();
        this.setState({ currentPhotoId: this.props.id })
    }

    render() {
        if (this.props.show === false) {
            return (
                <div className={styles.displaynone}>
                </div>
            );
        } else if (this.props.show === true) {
            return (
                <div className={styles.displayblock}>
                    <div className={styles.displaygrid}>
                        <div className={styles.leftarrow} onClick={this.photoBack}>
                            <svg role="presentation" focusable="false" className={styles.arrow}>
                                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className={styles.centerimage}>
                            <img src={this.state.currentPhoto}></img>
                        </div>
                        <div className={styles.rightarrow} onClick={this.photoForward}>
                            <svg role="presentation" focusable="false" className={styles.arrow}>
                                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path>
                            </svg>
                        </div>                   
                        <div className={styles.close} onClick={this.close}>
                            <svg role="img" aria-label="Close" focusable="false">
                                <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path>
                            </svg>
                        </div>                       
                        <CarouselImages translate={this.state.translate} currentPhotoId={this.state.currentPhotoId} back={this.photoBack} forward={this.photoForward} photos={this.state.photos} />                    
                        <div className={styles.photodescription}>
                            <div>{(this.state.currentPhotoId - this.state.photos[0].id) + 1} / {this.state.photos.length}</div>
                            {this.state.photos[0].description}
                        </div>  
                    </div>
                </div>
            );
        }
    }
}

export default Carousel;