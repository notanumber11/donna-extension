import CloseIcon from "@mui/icons-material/Close";
import { CardHeader, Grid, IconButton, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";

import { callDonnaBackendAPI } from "@/components/donnaBackend/donnaBackendAPI";

import womanIcon from "../assets/woman_96_96.png";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        www.godonna.app
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

interface PopUpProps {
  selectedText: string;
  closeCallback: () => void;
}

export default function PopUp(props: PopUpProps) {
  const loadingMessage = "Generating your text . . .";
  const [initialText, setInitialText] = useState<string>(props.selectedText);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isGeneratedTextVisible, setIsGeneratedTextVisible] =
    useState<boolean>(false);

  const generateButtonOnClick = () => {
    setIsGeneratedTextVisible(true);
    setGeneratedText(loadingMessage);
    callDonna(initialText);
  };

  const tryAgainButtonOnClick = () => {
    setGeneratedText(loadingMessage);
    callDonna(initialText);
  };

  function callDonna(initialText: string) {
    const startTime = performance.now();
    callDonnaBackendAPI(initialText)
      .then(response => response.json())
      .then(data => {
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.log("The elapsed time of the network call is: " + elapsedTime);
        console.log("The result is:");
        const result = data;
        console.log(result);
        setGeneratedText(result);
      });
  }

  const copyButtonOnClick = () => {
    navigator.clipboard.writeText(generatedText).then(() => {
      console.log("Content copied to clipboard");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={8}
        sx={{
          border: "red",
          margin: "5px",
          padding: "5px",
          borderRadius: "2%",
          width: "400px",
        }}
      >
        <Container>
          <CssBaseline />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }}>
                <img
                  style={{ width: 36, height: 36 }}
                  src={chrome.runtime.getURL("") + "src/assets/woman_96_96.png"}
                  className="App-logo"
                  alt="logo"
                />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={props.closeCallback}>
                <CloseIcon />
              </IconButton>
            }
            title={
              <Typography component="h1" variant="h5">
                Donna
              </Typography>
            }
          />
          <Box>
            <TextField
              required
              fullWidth
              multiline
              id="baseText"
              value={initialText}
              name="Base text"
              placeholder="Write here the text that you want to rewrite."
              autoComplete="Text to rephrase"
              rows={6}
              onChange={e => setInitialText(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              onClick={generateButtonOnClick}
            >
              Generate
            </Button>
            {isGeneratedTextVisible && (
              <Box>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="generatedText"
                  label="Generated text"
                  value={generatedText}
                  name="Generated text"
                  autoComplete="Generated text"
                  rows={6}
                  onChange={e => setGeneratedText(e.target.value)}
                />
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        sx={{ mt: 3, mb: 3 }}
                        variant="contained"
                        onClick={tryAgainButtonOnClick}
                      >
                        Try again
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        sx={{ mt: 3, mb: 3 }}
                        variant="contained"
                        color="success"
                        onClick={copyButtonOnClick}
                      >
                        Copy
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>
          <Copyright sx={{ mt: 2, mb: 2 }} />
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
