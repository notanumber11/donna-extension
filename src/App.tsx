import Button from "@mui/material/Button";

import Logo from "@/assets/logo.png";
import CustomFrame from "@/components/CustomFrame";

import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.main}>
      <img
        /*
            src={chrome.runtime.getURL(Logo)}
*/
        className={styles.logo}
        alt="logo"
      />
      <img className={styles.logo} alt="React logo" width="400px" src={Logo} />
      <CustomFrame>
        <Button variant="contained">Inside frame</Button>
      </CustomFrame>
      <Button variant="contained">Hello World</Button>
    </main>
  );
}
