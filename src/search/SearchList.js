import { Component } from "react";
import Food from "./Food";


class SearchList extends Component {
  render() {
    return (
      <div className="foodList" >
        <h3 style={{ color: "blue", textAlign: "center" }}>Here are your search results</h3>
        <hr />
        {this.props.foodList.map((f) => (
          <div key={f.id}>
            <Food id={f.id} name={f.name} calories={f.cal} photo={f.photo} quantity={f.qty} />
          </div>
        ))}
      </div>
    )
  }
}

export default SearchList;