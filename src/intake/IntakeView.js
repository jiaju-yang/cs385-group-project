import { Component } from "react";
import PubSub from 'pubsub-js';
import { Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { UserDeletedFoodFromIntakeList } from "../event";

class IntakeView extends Component {
  render() {
    return (
      <div className="foodIntake">
        <hr />
        <h4 style={{ textAlign: 'center' }}>Your Daily Intake:</h4>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '5rem', color: 'blue' }}>{this.props.intakeFood.reduce((acc, obj) => (acc + obj.calories), 0)}</span>
          <span>cal</span>
        </div>
        {this.props.intakeFood.map((f, index) => (
          <div key={index}>
            <img src={f.photo} alt={f.name} style={{ position: 'relative', width: '40px', margin: '10px 30px', verticalAlign: 'center' }} />
            <div style={{ position: 'relative', marginLeft: '70px', marginTop: '-55px' }}>
              <span style={{ color: 'black', fontSize: '1.2rem', paddingLeft: '20px' }}> {f.name} </span> <br />
              <span style={{ color: 'orange', fontSize: '0.8rem', fontWeight: 'bold', paddingLeft: '20px' }}>{f.calories}&nbsp;cal&nbsp;</span>
              <span style={{ color: 'grey', fontSize: '0.8rem', fontWeight: 'italic' }}>/&nbsp;{f.quantity}</span>
              <Button
                type="primary"
                style={{ position: 'relative', float: 'right', right: '20px', bottom: '20px' }}
                onClick={() => {
                  PubSub.publish(UserDeletedFoodFromIntakeList, { foodId: f.id });
                }}>
                <MinusCircleOutlined />
              </Button>
            </div>
          </div>
        ))}
      </div>)
  }
}

export default IntakeView;
