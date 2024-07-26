import { Component } from "react";

export default class Carousel extends Component {
  state = {
    active: 0,
  };
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };
  handleIndexClick = (ev) => {
    this.setState({ active: +ev.target.dataset.index });
  };
  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              className={index === active ? "active" : ""}
              alt="animal thumpnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}
