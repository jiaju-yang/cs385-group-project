import { Component } from "react";
import SearchInput from "./SearchInput"
import SearchList from "./SearchList"


class SearchView extends Component {
    render() {
        return (
            <div className="SearchView">
                <SearchInput
                    searchKeyword={this.props.searchKeyword}
                />
                <SearchList
                    fetchingStatus={this.props.fetchingStatus}
                    fetchingError={this.props.fetchingError}
                    foodList={this.props.foundFoods}
                />
            </div>
        )
    }
}

export default SearchView;