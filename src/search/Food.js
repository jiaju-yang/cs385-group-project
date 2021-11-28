// import { text } from 'dom-helpers';
import React, { Component } from 'react'
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import PubSub from 'pubsub-js';
import { UserAddedFoodToIntakeList } from "../event";

export default class Food extends Component {
  render() {
    const { name, calories, photo, quantity } = this.props;
    return (
      <div className="SingleFood" style={{ paddingLeft: '20px', position: 'relative', height: '80px' }}>
        <img src={photo} alt={name} style={{ position: 'relative', width: '40px', float: 'left', margin: '10px 5px', verticalAlign: 'center' }} />
        <div style={{ position: 'relative', paddingLeft: '20px' }}>
          <span style={{ color: 'black', fontSize: '1.2rem', paddingLeft: '20px' }}> {name} </span> <br />
          <span style={{ color: 'orange', fontSize: '0.8rem', fontWeight: 'bold', paddingLeft: '20px' }}>{calories}&nbsp;cal&nbsp;</span>
          <span style={{ color: 'grey', fontSize: '0.8rem', fontWeight: 'italic' }}>/&nbsp;{quantity}</span>
        </div>
        <Button
          type="primary"
          style={{ position: 'relative', float: 'right', right: '20px', bottom: '35px' }}
          onClick={event => {
            PubSub.publish(UserAddedFoodToIntakeList, this.props);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </div>
    )
  }
}
