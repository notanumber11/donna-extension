import React from "react";

import CustomFrame from "@/components/CustomFrame";
import PopUp from "@/components/Popup";

interface AppProps {
  selectedText: string;
}

export default function App(appProps: AppProps) {

  return (
    <main>
      <React.StrictMode>
          <CustomFrame>
              <PopUp selectedText={appProps.selectedText} />
          </CustomFrame>
      </React.StrictMode>
    </main>
  );
}
