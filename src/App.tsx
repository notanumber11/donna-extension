import React, { useEffect, useState } from "react";

import CustomFrame from "@/components/CustomFrame";
import PopUp from "@/components/Popup";

interface AppProps {
  selectedText: string;
}

export default function App(appProps: AppProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    // Anything in here is fired on component mount.
    setIsOpen(true);
  }, [appProps]); // 👈️ add props as dependencies

  return (
    <main>
      <React.StrictMode>
        <CustomFrame>
          {isOpen && (
            <PopUp
              selectedText={appProps.selectedText}
              closeCallback={() => setIsOpen(false)}
            />
          )}
        </CustomFrame>
      </React.StrictMode>
    </main>
  );
}
