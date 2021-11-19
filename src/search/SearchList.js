import { Component } from "react";
import Food from "./Food";

class SearchList extends Component {
    render() {
        console.log(this.props.foodList)
        //todo
        return (
        <div className="foodList">
            <h1>Food</h1>
            {this.props.foodList.map((f)=>(
                <div key={f.id}>
                    <Food name={f.name} calories={f.calories}/>
                </div>
            ))}
            
        </div>
            
        )
    }
}

export default SearchList;