import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Radio,
  multiline
} from "@material-ui/core";
import VerySad from "@material-ui/icons/SentimentVeryDissatisfied";
import Sad from "@material-ui/icons/SentimentDissatisfied";
import Happy from "@material-ui/icons/SentimentSatisfied";
import VeryHappy from "@material-ui/icons/SentimentSatisfiedAlt";
import { Link, Route } from "react-router-dom";
import { db, functions } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import Slider from "@material-ui/core/Slider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Survey(props) {
  const [sleep, setSleep] = useState("");
  const [happiness, setHappiness] = useState(0);
  const [scripture, setScripture] = useState("");
  const [excercise, setExcercise] = useState("");
  const [openSleep, setOpenSleep] = useState(false);
  const [openScripture, setOpenScripture] = useState(false);
  const [openExcercise, setOpenExcercise] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [message, setMessage] = useState(
    "Hey, Check out my cool health tracker app. https://healthtracker-4cece.web.app"
  );

  const handleCloseSleep = () => {
    setOpenSleep(false);
  };

  const handleOpenSleep = () => {
    setOpenSleep(true);
  };

  const handleCloseScripture = () => {
    setOpenScripture(false);
  };

  const handleOpenScripture = () => {
    setOpenScripture(true);
  };

  const handleCloseExcercise = () => {
    setOpenExcercise(false);
  };

  const handleOpenExcercise = () => {
    setOpenExcercise(true);
  };

  // const useEPStyles = makeStyles(theme => ({
  //   root: {
  //     width: "100%"
  //   },
  //   heading: {
  //     fontSize: theme.typography.pxToRem(15),
  //     fontWeight: theme.typography.fontWeightRegular
  //   }
  // }));

  const useStyles = makeStyles(theme => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  }));
  const handleSave = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .add({
        sleep: sleep,
        happiness: happiness,
        scripture: scripture,
        excercise: excercise,
        date: new Date()
      })
      .then(() => {
        setSleep("");
        setHappiness(0);
        setScripture("");
        setExcercise("");
      });
  };
  const handleSendInvite = () => {
    const sendInvite = functions().httpsCallable("sendInvite");

    sendInvite({ number: phoneNumber, message: message }).then(function(
      result
    ) {});
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper
        style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
      >
        <Typography variant="h4">Survey</Typography>
        <div>
          {/* this code below is for a slider, if you can figure out how to change it to this it would look really good. */}
          {/* <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Temperature
      </Typography>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={12}
      /> */}

          <FormControl style={{ display: "flex", justifyContent: "center" }}>
            <InputLabel id="demo-controlled-open-select-label">
              How many hours of sleep did you get last night?
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openSleep}
              onClose={handleCloseSleep}
              onOpen={handleOpenSleep}
              value={sleep}
              onChange={e => setSleep(e.target.value)}
            >
              ><MenuItem value=""></MenuItem>
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>1 Hour</MenuItem>
              <MenuItem value={2}>2 Hours</MenuItem>
              <MenuItem value={3}>3 Hours</MenuItem>
              <MenuItem value={4}>4 Hours</MenuItem>
              <MenuItem value={5}>5 Hours</MenuItem>
              <MenuItem value={6}>6 Hours</MenuItem>
              <MenuItem value={7}>7 Hours</MenuItem>
              <MenuItem value={8}>8 Hours</MenuItem>
              <MenuItem value={9}>9 Hours</MenuItem>
              <MenuItem value={10}>10 Hours</MenuItem>
              <MenuItem value={11}>11 Hours</MenuItem>
              <MenuItem value={12}>12 Hours</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl style={{ display: "flex", justifyContent: "center" }}>
            <InputLabel id="demo-controlled-open-select-label">
              How long did you study your scriptures for?
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openScripture}
              onClose={handleCloseScripture}
              onOpen={handleOpenScripture}
              value={scripture}
              onChange={e => setScripture(e.target.value)}
            >
              ><MenuItem value=""></MenuItem>
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>10 Minutes</MenuItem>
              <MenuItem value={2}>20 Minutes</MenuItem>
              <MenuItem value={3}>30 Minutes</MenuItem>
              <MenuItem value={4}>40 Minutes</MenuItem>
              <MenuItem value={5}>50 Minutes</MenuItem>
              <MenuItem value={6}>1 Hour</MenuItem>
              <MenuItem value={7}>1 hour 10 Minutes</MenuItem>
              <MenuItem value={8}>1 hour 20 Minutes</MenuItem>
              <MenuItem value={9}>1 hour 30 Minutes</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl style={{ display: "flex", justifyContent: "center" }}>
            <InputLabel id="demo-controlled-open-select-label">
              How long did you excercise for?
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openExcercise}
              onClose={handleCloseExcercise}
              onOpen={handleOpenExcercise}
              value={excercise}
              onChange={e => setExcercise(e.target.value)}
            >
              ><MenuItem value=""></MenuItem>
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>10 Minutes</MenuItem>
              <MenuItem value={2}>20 Minutes</MenuItem>
              <MenuItem value={3}>30 Minutes</MenuItem>
              <MenuItem value={4}>40 Minutes</MenuItem>
              <MenuItem value={5}>50 Minutes</MenuItem>
              <MenuItem value={6}>1 Hour</MenuItem>
              <MenuItem value={7}>1 hour 10 Minutes</MenuItem>
              <MenuItem value={8}>1 hour 20 Minutes</MenuItem>
              <MenuItem value={9}>1 hour 30 Minutes</MenuItem>
            </Select>
          </FormControl>
          <Typography style={{ marginTop: 16 }}>How happy are you?</Typography>
          <div style={{ display: "felx" }}>
            <Radio
              checked={happiness === 1}
              checkedIcon={<VerySad />}
              icon={<VerySad />}
              onChange={() => setHappiness(1)}
            />
            <Radio
              checked={happiness === 2}
              checkedIcon={<Sad />}
              icon={<Sad />}
              onChange={() => setHappiness(2)}
            />
            <Radio
              checked={happiness === 3}
              checkedIcon={<Happy />}
              icon={<Happy />}
              onChange={() => setHappiness(3)}
            />
            <Radio
              checked={happiness === 4}
              checkedIcon={<VeryHappy />}
              icon={<VeryHappy />}
              onChange={() => setHappiness(4)}
            />
          </div>
        </div>
        <Button
          onClick={handleSave}
          style={{ marginTop: 16 }}
          variant="outlined"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Paper>

      <Paper
        style={{
          padding: 12,
          marginTop: 30,
          marginBottom: 30,
          width: "100%",
          maxWidth: 400
        }}
      >
        <Typography variant="h4">Invite User</Typography>
        <Typography style={{ marginTop: 16 }}>Phone Number</Typography>
        <TextField
          fullWidth={true}
          value={phoneNumber}
          onChange={e => setphoneNumber(e.target.value)}
        />
        <Typography style={{ marginTop: 16 }}>Message</Typography>

        <TextField
          fullWidth={true}
          multiline
          rows={2}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        {/* <ExpansionPanel
          style={{
            display: "flex",
            flexDirection: "column"

            // padding: 12,
            // marginTop: 30,
            // marginBottom: 30,
            // width: "100%",
            // maxWidth: 350
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Message</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography width="100%">
              <TextField
                width="100%"
                value={message}
                onChange={e => setMessage(e.target.value)}
              ></TextField>
              Hey, Check out my cool health tracker app.
              https://healthtracker-4cece.web.app
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}

        <Button
          onClick={handleSendInvite}
          style={{ marginTop: 16 }}
          variant="outlined"
          color="primary"
          startIcon={<ShareIcon />}
        >
          Share
        </Button>
      </Paper>
    </div>
  );
}
