import * as React from "react";
import { ILazyProperties } from "./interfaces";

class Lazy extends React.Component<ILazyProperties, { visible: boolean }> {
  wrapperReference: React.RefObject<HTMLDivElement>;
  observer: any;

  state = {
    visible: false
  };

  constructor(props) {
    super(props);

    let options = {
      root: this.props.root,
      threshold: 1.0
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
      if (entry.intersectionRatio > 0) {
        this.setState({
          visible: true
        });
      } else {
        this.setState({
          visible: false
        });
      }
    });
  };

  render() {
    const { children } = this.props;

    return (
      <div ref={this.wrapperReference}>{this.state.visible && children}</div>
    );
  }
}

export default Lazy;
