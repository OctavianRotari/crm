import React, {Component} from "react";
import {connect} from "react-redux";
import {SCREEN_STATE_LOADING} from "core/components/screen/action";
// import * as styles from "./loader.scss";
import Transition from "core/components/transition";

@connect( state => {
  return {
    screenState: state.screen.state,
  };
})
export default class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {
          this.props.screenState === SCREEN_STATE_LOADING &&
          (
            <div className="loader-section">
              <div className="screen-loader"/>
            </div>
          )
        }
        <Transition
          className="animator"
          onEnterClassName="fade-in"
          onExitClassName="fade-out"
        >
          {this.props.children || null}
        </Transition>
      </div>
    );
  }
}
