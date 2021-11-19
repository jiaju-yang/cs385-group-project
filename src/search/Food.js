import React, { Component } from 'react'

export default class Food extends Component {
    render() {
        return (
            <div>
                {this.props.name} {this.props.calories}
            </div>
        )
    }
}
