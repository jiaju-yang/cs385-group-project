import { Component } from "react";

class SearchInput extends Component {
    render() {
        return (
            <div className="SearchFormComponent">
                <hr />
                <form>
                    <input
                        type="text"
                        value={this.props.searchKeyword}
                        onChange={event => this.props.userTypedSearchKeyword(event.target.value)}
                    />
                </form>
                <button onClick={event => this.props.fetchFoods(this.props.searchKeyword)}>Search</button>
                <hr />
            </div>
        );
    }
}

export default SearchInput;