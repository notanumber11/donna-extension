// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Based on: https://stackoverflow.com/questions/54376270/using-material-ui-components-inside-an-iframehttps://stackoverflow.com/questions/54376270/using-material-ui-components-inside-an-iframe
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import React from "react";
import * as ReactDOM from "react-dom";
import Frame from "react-frame-component";

type DemoFrameProps = {
  frameStyles: any;
  children: any;
};

class DemoFrame extends React.Component<DemoFrameProps> {
  state = {
    ready: false,
  };

  constructor(props: DemoFrameProps) {
    super(props);
    this.span = React.createRef();
    this.interval = null;
  }

  handleRef = ref => {
    this.contentDocument = ref ? ref.node.contentDocument : null;
    this.contentWindow = ref ? ref.node.contentWindow : null;
  };

  onContentDidMount = () => {
    this.setState({
      ready: true,
      jss: create({
        plugins: [...jssPreset().plugins],
        insertionPoint: this.contentWindow["demo-frame-jss"],
      }),
      sheetsManager: new Map(),
      container: this.contentDocument.body,
    });
    this.applyCssOverrides();
    this.interval = setInterval(() => this.applyCssOverrides(), 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // https://www.tutorialrepublic.com/faq/automatically-adjust-iframe-height-according-to-its-contents-using-javascript.php#:~:text=Answer%3A%20Use%20the%20contentWindow%20Property,no%20vertical%20scrollbar%20will%20appear.
  applyCssOverrides() {
    const fr = this.span.current.getElementsByTagName("iframe")[0];
    if (fr) {
      // Remove default 8px margin that chrome applies to the new <body> under the <iframe>
      fr.contentDocument
        .getElementsByTagName("body")[0]
        .setAttribute("style", "margin:0px");
      // Adjust automatically the size of the frame
      const width = fr.contentWindow.document.body.scrollWidth;
      const height = fr.contentWindow.document.body.scrollHeight;
      // console.log(`The size is: ${width} x ${height}`);
      fr.width = width;
      fr.height = height;
      fr.style.width = `${width}px`;
      fr.style.height = `${height}px`;
      fr.style.setProperty("width", fr.style.width, "important");
      fr.style.setProperty("height", fr.style.height, "important");
    }
  }

  onContentDidUpdate = () => {
    this.applyCssOverrides();
  };

  render() {
    // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
    return (
      <span ref={this.span}>
        {/*        <NoSsr>*/}
        <Frame
          ref={this.handleRef}
          scrolling="no"
          style={this.props.frameStyles}
          contentDidMount={this.onContentDidMount}
          contentDidUpdate={this.onContentDidUpdate}
          onLoad={() => this.applyCssOverrides()}
        >
          <div id="demo-frame-jss" />
          {this.state.ready
            ? /*            <StylesProvider
              jss={this.state.jss}
              sheetsManager={this.state.sheetsManager}
            >
              {React.cloneElement(children, {
                container: this.state.container,
              })}
            </StylesProvider>*/
              ReactDOM.createPortal(
                <CacheProvider value={cache}>{props.children}</CacheProvider>,
                mountNode
              )
            : null}
        </Frame>
        {/*        </NoSsr>*/}
      </span>
    );
  }
}

DemoFrame.propTypes = {
  children: PropTypes.node.isRequired,
  frameStyles: PropTypes.any,
};

export default DemoFrame;
