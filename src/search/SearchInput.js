import { Component } from "react";
import { UserTypedSearchKeyword, UserSearchFood } from "../event";
import PubSub from 'pubsub-js';

class SearchInput extends Component {
    render() {
        return (
            <div className="SearchFormComponent">
                <hr />
                <form>
                    <input
                        type="text"
                        value={this.props.searchKeyword}
                        onChange={event => {
                            PubSub.publish(UserTypedSearchKeyword, { keyword: event.target.value });
                        }}
                    />
                </form>
                <button onClick={event => {
                    PubSub.publish(UserSearchFood, { keyword: this.props.searchKeyword });
                }}>
                    Search
                </button>
                <hr />
            </div>
        );
    }
}

export default SearchInput;