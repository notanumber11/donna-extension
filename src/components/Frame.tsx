import React from "react";

type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};

const popUpStylesFrame = {
  width: "0px",
  height: "0px",
  border: "none",
  padding: "none",
  boxShadow: shadows[3],
  zIndex: 2147483647,
  // Try to emulate the position of the popup in the chrome extension
  position: "fixed",
  right: "20px",
  top: "20px",
  maxHeight: "1000px"
};

class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  render() {
    return (
      <iframe title={"example"}>
        <div>
          {this.props.message} {this.state.count}
        </div>
      </iframe>
    );
  }
}
