import React from "react";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  Typography,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import axios from "axios";
import Chart from "./components/Chart";

import {
  USD,
  EUR,
  GBP,
  UnitedStatesDollar,
  BritishPoundSterling,
  Euro,
  API,
} from "./utils";

const App = () => {
  const [currency, setCurrency] = React.useState(USD);
  const [country, setCountry] = React.useState(UnitedStatesDollar);
  const [graphData, setGraphData] = React.useState([]);

  const getBitcoin = async () => {
    axios
      .get(API(currency))
      .then((result) => {
        const data = result.data.bpi;
        let arr = [];
        // eslint-disable-next-line
        Object.entries(data).map(([key, value]) => {
          const obj = {
            date: key,
            value,
          };
          arr = [...arr, obj];
        });
        setGraphData(arr);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getBitcoin();
  }, [currency]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrency(value);
    switch (value) {
      case "EUR": {
        setCountry(Euro);
        break;
      }
      case "GBP": {
        setCountry(BritishPoundSterling);
        break;
      }
      default:
        setCountry(UnitedStatesDollar);
        break;
    }
  };
  return (
    <Container style={{ marginTop: 30 }}>
      <Card style={{ margin: "0 auto" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                1 Bitcoin Equals
              </Typography>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    currency
                  </InputLabel>
                  <Select
                    value={currency}
                    onChange={handleChange}
                    label="currency"
                  >
                    <MenuItem value={USD}>{UnitedStatesDollar}</MenuItem>
                    <MenuItem value={GBP}>{BritishPoundSterling}</MenuItem>
                    <MenuItem value={EUR}>{Euro}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Typography variant="h6" style={{ marginTop: 20 }}>
                {Object.keys(graphData).length > 0
                  ? `${graphData[graphData.length - 1].value} ${country}`
                  : "Loading..."}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Chart data={graphData} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
