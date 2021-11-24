import { Component } from "react";
import PubSub from 'pubsub-js';
// import Food from "../search/Food";
import { Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

class IntakeView extends Component {
    constructor(props){
        super(props);
        this.state = {intakeFood:[]};
    }
    deleteIntake(foodID) {
        let indexToRemove = this.state.intakeFood.findIndex(
          this.searchForFoodByID(foodID));
        if (indexToRemove >= 0) this.removeProduct(indexToRemove);
    }

    searchForFoodByID(id) {
        return function (theObject) {
            return theObject.id === id;
        };
    }
    removeProduct(indexToRemove) {
        if (this.state.intakeFood.length > 0) {
            let tempList = this.state.intakeFood;
            tempList.splice(indexToRemove, 1); 
            this.setState({ intakeFood: tempList });
        }
    }
    
    render() {
        PubSub.unsubscribe('I eat something');
        PubSub.subscribe('I eat something',(msg,data)=>{
            this.setState({intakeFood: [data,...this.state.intakeFood]});
        })
        
        return (
            
        <div className="foodIntake">
            <hr />
            <h4 style={{textAlign:'center'}}>Your Daily Intake:</h4>
            <div style={{textAlign:'center'}}>
                <span style={{fontSize:'5rem',color:'blue'}}>{this.state.intakeFood.reduce((acc,obj)=>(acc+obj.calories),0)}</span>
                <span>cal</span>
            </div>
            {this.state.intakeFood.map((f,index)=>(
                <div key={index}>
                    <img src={f.photo} alt={f.name} style={{position:'relative',width:'40px',margin:'10px 30px',verticalAlign:'center'}}/>
                    <div style={{ position: 'relative', marginLeft: '70px',marginTop:'-55px' }}>
                        <span style={{ color: 'black', fontSize: '1.2rem', paddingLeft: '20px' }}> {f.name} </span> <br />
                        <span style={{ color: 'orange', fontSize: '0.8rem', fontWeight: 'bold', paddingLeft: '20px' }}>{f.calories}&nbsp;cal&nbsp;</span>
                        <span style={{ color: 'grey', fontSize: '0.8rem', fontWeight: 'italic' }}>/&nbsp;{f.quantity}</span>
                        <Button
                            type="primary"
                            style={{ position: 'relative', float: 'right', right: '20px', bottom: '20px' }}
                            onClick={() => {this.deleteIntake(f.id);}}>
                            <MinusCircleOutlined />
                        </Button>
                    </div>
                </div>
            ))}
           
        </div>)
    }
}

export default IntakeView;