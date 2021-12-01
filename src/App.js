
import { Component } from "react";
import React from 'react';
import { UserTypedSearchKeyword, UserSearchFood, UserAddedFoodToIntakeList, UserDeletedFoodFromIntakeList, UserAttemptsToLogin, UserLoginFail } from "./event";
import getFoodList from "./api";
import { apiStatus } from "./enums";
import PubSub from 'pubsub-js';
import SearchView from "./search/SearchView";
import IntakeView from './intake/IntakeView';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from "./SignIn";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./fbconfig";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "searchKeyword": "",
      "foundFoods": [],
      "fetchingStatus": apiStatus.no_fetch,
      "fetchingError": "",
      "intakeFood": [],
      "layout": "home",
      "user": {
        isLogin: false,
        email: "",
        accessToken: null,
        uid: null
      }
    }
  }
  componentDidMount() {
    const parent = this;
    PubSub.subscribe(UserTypedSearchKeyword, (msg, data) => {
      parent.setState({
        "searchKeyword": data.keyword,
        "fetchingStatus": apiStatus.no_fetch
      })
    })

    PubSub.subscribe(UserSearchFood, (msg, data) => {
      parent.setState({
        "foundFoods": [],
        "fetchingStatus": apiStatus.fetching,
        "fetchingError": ""
      })
      getFoodList(data.keyword)
        .then(function (result) {
          if (result.success) {
            parent.setState({
              "searchKeyword": data.keyword,
              "foundFoods": result.data.foodList,
              "fetchingStatus": apiStatus.success,
              "fetchingError": ""
            });
          } else {
            parent.setState({
              "searchKeyword": data.keyword,
              "foundFoods": [],
              "fetchingStatus": apiStatus.failed,
              "fetchingError": result.data.error
            })
          }
        });
    })

    PubSub.subscribe(UserAddedFoodToIntakeList, (msg, data) => {
      parent.setState({ intakeFood: [data, ...parent.state.intakeFood] });
    })

    PubSub.subscribe(UserDeletedFoodFromIntakeList, (msg, data) => {
      const indexToRemove = this.state.intakeFood.findIndex(
        this.searchForFoodById(data.foodId));
      if (indexToRemove >= 0) this.removeProduct(indexToRemove);
    })

    PubSub.subscribe(UserAttemptsToLogin, (msg, { email, password }) => {
      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          this.setState({
            user: {
              isLogin: true,
              email: user.email,
              accessToken: user.accessToken,
              uid: user.uid
            }
          })
        })
        .catch((error) => {
          PubSub.publish(UserLoginFail, { reason: error })
        });
    })
  }

  removeProduct(indexToRemove) {
    if (this.state.intakeFood.length > 0) {
      const tempList = [...this.state.intakeFood];
      tempList.splice(indexToRemove, 1);
      this.setState({ intakeFood: tempList });
    }
  }

  searchForFoodById(id) {
    return function (theObject) {
      return theObject.id === id;
    };
  }

  render() {
    const layouts = {
      "search":
        <SearchView
          searchKeyword={this.state.searchKeyword}
          fetchingStatus={this.state.fetchingStatus}
          fetchingError={this.state.fetchingError}
          foundFoods={this.state.foundFoods}
        />,
      "intake":
        <IntakeView
          intakeFood={this.state.intakeFood}
        />,
      "home":
        <SignIn />
    };
    return (
      <div className="App">
        <Box sx={{ pb: 7 }}>
          <CssBaseline />
          {layouts[this.state.layout]}
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={2}>
            <BottomNavigation
              showLabels
              value={this.state.layout}
              onChange={(event, newLayout) => {
                this.setState({ layout: newLayout });
              }}
            >
              <BottomNavigationAction label="Home" value="home" icon={<AnalyticsIcon />} />
              <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
              <BottomNavigationAction label="Intake" value="intake" icon={<AnalyticsIcon />} />
            </BottomNavigation>
          </Paper>
        </Box>
      </div >
    );
  }
}

export default App;
