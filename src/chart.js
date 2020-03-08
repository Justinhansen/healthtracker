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
  Radio
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import moment from "moment";
// import twilio from "./index";
import { Link, Route } from "react-router-dom";
import { db } from "./firebase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Chart(props) {
  const [surveys, setSurvey] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [table, setTable] = useState([]);

  const handletwilio = () => {};
  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .onSnapshot(snapshot => {
        const surveys = snapshot.docs.map(doc => {
          const survey = {
            sleep: doc.data().sleep,
            happiness: doc.data().happiness,
            scripture: doc.data().scripture,
            excercise: doc.data().excercise,
            date: new Date(doc.data().date.seconds * 1000),
            id: doc.id
          };
          return survey;
        });

        const sorted = surveys.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else {
            return -1;
          }
        });

        setSurvey(surveys);
      });
  }, []);

  useEffect(() => {
    // get and display labels
    const lbls = surveys.map(survey => {
      return moment(survey.date).format("M/D/YY");
    });
    setLabels(lbls);

    // creating holder array for data sets, push data to as its created.
    const sets = [];

    // creating sleep object
    const sleep = {
      label: "Hours of Sleep",
      data: surveys.map(s => s.sleep),
      borderColor: "red",
      borderWidth: 1
    };
    sets.push(sleep);

    const happiness = {
      label: "Happiness",
      data: surveys.map(s => s.happiness),
      borderColor: "blue",
      borderWidth: 1
    };
    sets.push(happiness);

    const scripture = {
      label: "Scripture Study",
      data: surveys.map(s => s.scripture),
      borderColor: "yellow",
      borderWidth: 1
    };
    sets.push(scripture);

    const excercise = {
      label: "Excercise",
      data: surveys.map(s => s.excercise),
      borderColor: "green",
      borderWidth: 1
    };
    sets.push(excercise);

    // set the state variable

    setDataSets(sets);
  }, [surveys]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
        >
          <Typography variant="h4">Chart</Typography>
          <Line
            data={{
              labels: labels,
              datasets: dataSets
            }}
          />
        </Paper>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
        >
          <Table
            aria-label="simple table"
            style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Sleep</TableCell>
                <TableCell align="right">Scripture</TableCell>
                <TableCell align="right">Excercise</TableCell>
                <TableCell align="right">Happiness</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              data={{
                labels: labels,
                datasets: dataSets
              }}
            >
              {/* {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name} */}
              {/* </TableCell> */}
              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{}</TableCell> */}
              {/* </TableRow> */}
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
