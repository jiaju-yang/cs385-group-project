import { Component } from "react";

class SearchInput extends Component {
    render() {
        //todo
        // this.props are the properties which are provided or passed
        // to this component. We have the searchTerm and we have the
        // onChange function.
        const searchTermFromProps = this.props.searchTerm;
        const onChangeFromProps = this.props.onChange;
        return (
            <div className="SearchFormComponent">
                <hr />
                Search Component:
                <form>
                    <input
                        type="text"
                        value={searchTermFromProps}
                        onChange={onChangeFromProps}
                    />
                </form>
                <hr />
            </div>
        );
    }
}

export default SearchInput;