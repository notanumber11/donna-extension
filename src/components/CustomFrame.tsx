// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import Frame from "react-frame-component";

interface CustomFrameProps {
  children: any;
}

// https://stackoverflow.com/questions/70470061/how-to-use-material-ui-mui-5-0-inside-an-iframe
const CustomFrame = (props: CustomFrameProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [contentRef, setContentRef] = useState<any>(null);
  const [isContentRefSet, setIsContentRefSet] = useState<boolean>(false);

  const setContentRefWrapper = (ref: any) => {
    if (!isContentRefSet) {
      if (ref) {
        setContentRef(ref);
        setIsContentRefSet(true);
        // Apply css
        applyCssOverrides();
        setInterval(() => applyCssOverrides(), 250);
      }
    }
  };

  // https://www.tutorialrepublic.com/faq/automatically-adjust-iframe-height-according-to-its-contents-using-javascript.php#:~:text=Answer%3A%20Use%20the%20contentWindow%20Property,no%20vertical%20scrollbar%20will%20appear.
  const applyCssOverrides = () => {
    // console.log("Applying css overrides");
    const fr = document.getElementById("frame-donna");
    if (fr) {
      // Remove default 8px margin that chrome applies to the new <body> under the <iframe>
      fr.contentDocument
        .getElementsByTagName("body")[0]
        .setAttribute("style", "margin:0px");
      // Adjust automatically the size of the frame
      const width = fr.contentWindow.document.body.scrollWidth;
      const height = fr.contentWindow.document.body.scrollHeight + 10;
      // console.log(`The size is: ${width} x ${height}`);
      fr.width = width;
      fr.height = height;
      fr.style.width = `${width}px`;
      fr.style.height = `${height}px`;
      fr.style.setProperty("width", fr.style.width, "important");
      fr.style.setProperty("height", fr.style.height, "important");
    }
  };

  const cache = createCache({
    key: "donna-css",
    nonce: "donna-css",
    container: contentRef,
  });

  return (
    <Frame
      style={{
        width: "430px",
        border: "none",
        padding: "none",
        height: "360px",
        zIndex: 2147483647,
        // Try to emulate the position of the popup in the chrome extension
        position: "fixed",
        right: "20px",
        top: "20px",
        maxHeight: "1000px",
      }}
      scrolling="no"
      id={"frame-donna"}
    >
      <div ref={setContentRefWrapper} id={"donna-div"}>
        {isContentRefSet && (
          <CacheProvider value={cache}>{props.children}</CacheProvider>
        )}
      </div>
    </Frame>
  );
};
export default CustomFrame;
