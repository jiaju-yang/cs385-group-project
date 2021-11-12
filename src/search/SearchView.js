import { Component } from "react";
import SearchInput from "./SearchInput"
import SearchList from "./SearchList"


class SearchView extends Component {

    searchFood(keyword) {
        //todo
    }
    render() {
        //todo 
        return (
            <div className="SearchView">
                <SearchInput
                    searchFood={(keyword) => this.searchFood(keyword)}
                />
                <SearchList />
            </div>
        )
    }
}

export default SearchView;