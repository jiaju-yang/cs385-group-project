import { Component } from "react";
import SearchInput from "./SearchInput"
import SearchList from "./SearchList"
import getFoodList from "../api"
import { apiStatus } from "../enums"


class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "searchKeyword": "",
            "foundFoods": [],
            "fetchingStatus": apiStatus.no_fetch,
            "fetchingError": ""
        };
    }

    userTypedSearchKeyword(keyword) {
        this.setState({
            "searchKeyword": keyword,
            "fetchingStatus": apiStatus.no_fetch
        })
    }

    fetchFoods(keyword) {
        const parent = this;
        this.setState({
            "foundFoods": [],
            "fetchingStatus": apiStatus.fetching,
            "fetchingError": ""
        })
        getFoodList(keyword)
            .then(function (result) {
                if (result.success) {
                    parent.setState({
                        "searchKeyword": keyword,
                        "foundFoods": result.data.foodList,
                        "fetchingStatus": apiStatus.success,
                        "fetchingError": ""
                    });
                } else {
                    parent.setState({
                        "searchKeyword": keyword,
                        "foundFoods": [],
                        "fetchingStatus": apiStatus.failed,
                        "fetchingError": result.data.error
                    })
                }
            });

    }
    render() {
        return (
            <div className="SearchView">
                <SearchInput
                    fetchFoods={(keyword) => this.fetchFoods(keyword)}
                    userTypedSearchKeyword={(keyword) => this.userTypedSearchKeyword(keyword)}
                    searchKeyword={this.state.searchKeyword}
                />
                <SearchList
                    fetchingStatus={this.state.fetchingStatus}
                    fetchingError={this.state.fetchingError}
                    foodList={this.state.foundFoods}
                />
            </div>
        )
    }
}

export default SearchView;