import React from "react";
import { ILazyProperties, ILazyState } from "./interfaces";
import LazyContext from "./Context";

class Lazy extends React.Component<ILazyProperties, ILazyState> {
  wrapperReference: React.RefObject<HTMLDivElement>;
  observer: any;

  state = {
    percentage: 0
  };

  constructor(props) {
    super(props);

    let options = {
      root: this.props.root,
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    this.wrapperReference = React.createRef();
    this.observer = new IntersectionObserver(this.handleIntersection, options);
  }

  componentDidMount() {
    if (this.wrapperReference.current) {
      this.observer.observe(this.wrapperReference.current);
    }
  }

  handleIntersection = entries => {
    entries.forEach(entry => {
      this.setState({
        percentage: Math.floor(entry.intersectionRatio * 100)
      });
    });
  };

  render() {
    const { children } = this.props;

    return (
      <div ref={this.wrapperReference}>
        <LazyContext.Provider value={{ percentage: this.state.percentage }}>
          {this.state.percentage > 0 && children}
        </LazyContext.Provider>
      </div>
    );
  }
}

export default Lazy;
