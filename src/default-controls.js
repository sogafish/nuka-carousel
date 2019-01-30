import React from 'react';

const defaultButtonStyles = disabled => ({
  border: 0,
  background: 'rgba(0,0,0,0.4)',
  color: 'white',
  padding: 10,
  opacity: disabled ? 0.3 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer'
});

export class PreviousButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.previousSlide();
  }
  render() {
    const disabled =
      (this.props.currentSlide === 0 && !this.props.wrapAround) ||
      this.props.slideCount === 0;
    return (
      <button
        style={defaultButtonStyles(disabled)}
        disabled={disabled}
        onClick={this.handleClick}
        aria-label="previous"
      >
        PREV
      </button>
    );
  }
}

export class NextButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
    this.nextButtonDisable = this.nextButtonDisable.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.nextSlide();
  }

  nextButtonDisable(
    wrapAround,
    slidesToShow,
    currentSlide,
    slidesToScroll,
    slideCount
  ) {
    let disabledButton = false;
    if (!wrapAround) {
      if (slidesToShow > 1) {
        disabledButton = currentSlide + slidesToShow >= slideCount;
      } else if (slidesToShow === 1) {
        disabledButton = slidesToScroll >= 1 && currentSlide + 1 >= slideCount;
      }
    }
    return disabledButton;
  }
  render() {
    const {
      wrapAround,
      slidesToShow,
      currentSlide,
      slidesToScroll,
      slideCount
    } = this.props;

    const disabled = this.nextButtonDisable(
      wrapAround,
      slidesToShow,
      currentSlide,
      slidesToScroll,
      slideCount
    );

    return (
      <button
        style={defaultButtonStyles(disabled)}
        disabled={disabled}
        onClick={this.handleClick}
        aria-label="next"
      >
        NEXT
      </button>
    );
  }
}

export class PagingDots extends React.Component {
  getDotIndexes(slideCount, slidesToScroll, slidesToShow) {
    const dotIndexes = [];
    const lastDotIndex = slideCount - slidesToShow;
    if (lastDotIndex < 0) {
      return [0];
    }

    for (let i = 0; i < lastDotIndex; i += slidesToScroll) {
      dotIndexes.push(i);
    }
    dotIndexes.push(lastDotIndex);
    return dotIndexes;
  }

  getListStyles() {
    return {
      position: 'relative',
      margin: 0,
      top: -10,
      padding: 0
    };
  }

  getListItemStyles() {
    return {
      listStyleType: 'none',
      display: 'inline-block'
    };
  }

  getButtonStyles(active) {
    return {
      border: 0,
      background: 'transparent',
      color: 'black',
      cursor: 'pointer',
      padding: 10,
      fontSize: 24,
      opacity: active ? 1 : 0.5
    };
  }

  render() {
    const indexes = this.getDotIndexes(
      this.props.slideCount,
      this.props.slidesToScroll,
      this.props.slidesToShow
    );
    return (
      <ul style={this.getListStyles()}>
        {indexes.map(index => {
          return (
            <li style={this.getListItemStyles()} key={index}>
              <button
                style={this.getButtonStyles(this.props.currentSlide === index)}
                onClick={this.props.goToSlide.bind(null, index)}
                aria-label={`slide ${index + 1} bullet`}
              >
                &bull;
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
