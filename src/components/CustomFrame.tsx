import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import * as ReactDOM from "react-dom";

const CustomFrameStyles = styled("iframe")(() => ({
  width: "300px",
  height: "300px",
  border: "none",
  padding: "none",
  zIndex: 2147483647,
  // Try to emulate the position of the popup in the chrome extension
  position: "fixed",
  right: "20px",
  top: "20px",
  maxHeight: "1000px",
}));

interface CustomFrameProps {
  children: any;
}

// https://stackoverflow.com/questions/70470061/how-to-use-material-ui-mui-5-0-inside-an-iframe
const CustomFrame = (props: CustomFrameProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [contentRef, setContentRef] = useState<any>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const cache = createCache({
    key: "css",
    container: contentRef?.contentWindow?.document?.head,
    prepend: true,
  });
  return (
    <CustomFrameStyles ref={setContentRef}>
      {mountNode &&
        ReactDOM.createPortal(
          <CacheProvider value={cache}>{props.children}</CacheProvider>,
          mountNode
        )}
    </CustomFrameStyles>
  );
};
export default CustomFrame;