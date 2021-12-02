
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
import { addFood, getFood } from "./repository"
import 'antd/dist/antd.css';
import { Modal, InputNumber,Tooltip, Button } from 'antd';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';


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
      },
      "isDateModalVisible":false,
      "isQuantityModalVisible": false,
      "foodQuantity": 0,
      "date": new Date(),
      "singleKindOfFood":[]
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
              //use some fake date
              "foundFoods": [{"id":1,"name":'egg',"cal":100},
              {"id":2,"name":'apple',"cal":50}],
              "fetchingStatus": apiStatus.failed,
              "fetchingError": result.data.error
            })
          }
        });
    })

    PubSub.subscribe(UserAddedFoodToIntakeList, async (msg, { name, calories, photo, quantity }) => {
      const newFood = await addFood(this.state.user.uid, { name, calories, photo, quantity });
      parent.setState({ 
        intakeFood: [newFood, ...parent.state.intakeFood],
        isDateModalVisible: true,
        singleKindOfFood: { name, calories, photo, quantity }
      })
    });

    PubSub.subscribe(UserDeletedFoodFromIntakeList, (msg, data) => {
      const indexToRemove = this.state.intakeFood.findIndex(
        this.searchForFoodById(data.foodId));
      if (indexToRemove >= 0) this.removeProduct(indexToRemove);
    })

    PubSub.subscribe(UserAttemptsToLogin, (msg, { email, password }) => {
      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          const foods = await getFood(user.uid);
          this.setState({
            intakeFood: foods,
            user: {
              isLogin: true,
              email: user.email,
              accessToken: user.accessToken,
              uid: user.uid
            }
          });
        })
        .catch((error) => {
          PubSub.publish(UserLoginFail, { reason: error })
        });
    })
  }
  //close the date selector window
  dateHandleOk = () => {
    this.setState({isDateModalVisible:false});
    //pop a hint window to select food quantity
    this.setState({isQuantityModalVisible:true});
    //date has been stored when the user selects in the calendar

  };
  
  dateHandleCancel = () => {
    this.setState({isDateModalVisible:false});
  };
  onAdd = (singleFood) => {
    //check if the food is in the intake list of a particular day
    const exist = this.state.intakeFood.find((f) => f.id === singleFood.id && f.intakeDate === singleFood.intakeDate);
    if (exist) {
      this.setState({
        intakeFood:this.state.intakeFood.map((f) =>
          f.id === singleFood.id ? { ...exist, qty: exist.qty + this.state.foodQuantity } : f
        )
      });
    } else {
      //if the food is not in the list, add it as a new 
      this.setState({intakeFood:[...this.state.intakeFood, { ...singleFood, qty: this.state.foodQuantity, intakeDate:this.state.date.toDateString()}]});
    }
  };
  onAddByOne = (foodItem) => {
    const existFood = this.state.intakeFood.find((f) => f.id === foodItem.id && f.intakeDate === foodItem.intakeDate);
    this.setState({
      intakeFood:this.state.intakeFood.map((f) =>
        (f.id === foodItem.id && f.intakeDate === foodItem.intakeDate) ? { ...existFood, qty: existFood.qty + 1} : f
      )
    });
  };
  onRemoveByOne = (foodItem) => {
    const existFood = this.state.intakeFood.find((f) => f.id === foodItem.id && f.intakeDate === foodItem.intakeDate);
    if (existFood.qty === 1) {
      this.setState({intakeFood:this.state.intakeFood.filter((f) => f.id !== foodItem.id || f.intakeDate !== foodItem.intakeDate)});
    } else {
      this.setState({
        intakeFood:this.state.intakeFood.map((f) =>
          f.id === foodItem.id && f.intakeDate === foodItem.intakeDate? { ...existFood, qty: existFood.qty - 1 } : f
        )
      });
    }
  };
  //when ok button is clicked, add food to the intakeList
  quantityHandleOk = () => {
    this.setState({isQuantityModalVisible:false});
    this.onAdd(this.state.singleKindOfFood);

  };
  //close the quantity selector window
  quantityHandleCancel(e){
    e.nativeEvent.stopImmediatePropagation();
    this.setState({isQuantityModalVisible:false});
  };
  //get the quantity of the food
  onQuantityChange = (value) => {
    this.setState({foodQuantity:value});
  };


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
          onAddByOne={this.onAddByOne}
          onRemoveByOne={this.onRemoveByOne}
        />,
      "home":
        <SignIn />
    };
    return (
      <div className="App">
        <Modal title="Select the date" visible={this.state.isDateModalVisible} onOk={this.dateHandleOk} onCancel={this.dateHandleCancel}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Custom input"
              value={this.state.date}
              onChange={(newValue) => {
                this.setState({ date: newValue });
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input ref={inputRef} {...inputProps} />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </Modal>
        <Modal title="Select the quantity" visible={this.state.isQuantityModalVisible} onOk={this.quantityHandleOk} onCancel={e => this.quantityHandleCancel(e)}>
        <InputNumber style={{width:'200px !important'}} min={0} max={1000} defaultValue={0} onChange={this.onQuantityChange} />
        </Modal>
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
