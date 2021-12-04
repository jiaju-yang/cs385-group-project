import { Component } from "react";
import PubSub from 'pubsub-js';
import { Button,Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { UserUpdatedFoodFromIntakeList, UserDeletedFoodFromIntakeList } from "../event";

import * as React from 'react';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';

class IntakeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intakeDate: new Date(),
    }
  }

  onAddByOne = (f) => {
    PubSub.publish(UserUpdatedFoodFromIntakeList,
      {foodId: f.foodId,
        quantity: 1,
        intakeDate: this.state.intakeDate,
        });
  }

  onRemoveByOne = (f) => {
    if(f.quantity == 1){
      PubSub.publish(UserDeletedFoodFromIntakeList,
        {
          foodId: f.foodId,
          intakeDate: this.state.intakeDate,
        });
    }else{
      PubSub.publish(UserUpdatedFoodFromIntakeList,
        {
          foodId: f.foodId,
          quantity: -1,
          intakeDate: this.state.intakeDate,
        });
    }
  }

  render() {

    return (
      <div className="foodIntake">
        <hr />
        <h3 style={{ textAlign:'center', color:"white",padding:"20px" ,backgroundColor:"blue"}}>Here is Your Daily Intake:</h3>
        <div  style={{ marginLeft:'20px',right:'auto'}} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Custom input"
              value={this.state.date}
              onChange={(newValue) => {
                this.setState({intakeDate:newValue});
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input ref={inputRef} {...inputProps} />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </div>
        {this.props.intakeFood.map((f, index) => ((f.intakeDate.toDateString() === this.state.intakeDate.toDateString()) &&
          <div style={{padding:"20px"}} key={index}>
            <img src={f.photo} alt={f.name} style={{ position: 'relative', width: '40px', margin: '10px 30px', verticalAlign: 'center' }} />
            <div style={{ position: 'relative', marginLeft: '70px', marginTop: '-55px' }}>
              <span style={{ color:'ffddaa', fontSize: '1.2rem', paddingLeft: '20px' }}> {f.name} </span> <br />
              <span style={{ color: 'orange', fontSize: '0.8rem', fontWeight: 'bold', paddingLeft: '20px' }}>{f.calories}&nbsp;cal&nbsp;</span>
              {/* <span style={{ color: 'grey', fontSize: '0.8rem', fontWeight: 'italic' }}>/&nbsp;{f.quantity}</span> */}
              <div style={{ position: 'relative', float: 'right', right: '20px', bottom: '20px',alignItems:'center' }}>
                <Tooltip title="remove" onClick={() => {
                    // PubSub.publish(UserDeletedFoodFromIntakeList, { foodId: f.id });
                    this.onRemoveByOne(f);
                  }}>
                  <Button shape="circle" icon={<MinusOutlined />} />
                </Tooltip>
                <span style={{ color: 'blue',padding:'5px',margin:'5px' }}> {f.quantity}</span>
                <Tooltip title="add" onClick={() => {
                  // PubSub.publish(UserDeletedFoodFromIntakeList, { foodId: f.id });
                  this.onAddByOne(f);
                }}>
                  <Button shape="circle" icon={<PlusOutlined />} />
                </Tooltip>
              </div>
            </div>
            <div className="splitLine">
              <div style={{width:"100%",backgroundColor:"blue",height:"1px"}}></div>
            </div>
          </div>
        ))}
      </div>)
  }
}

export default IntakeView;
