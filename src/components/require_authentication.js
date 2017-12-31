import React, { Component } from 'react';
import { connect } from 'react-redux';

// skeleton of basic HOC
export default function (ComposedComponent) {
    class Authentication extends Component {

        // this is required to allow this.context to work
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push("/");
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push("/");
            }
        }

        render() {
            // console.log('Rendering', ComposedComponent);
            // console.log(this.props.authenticated);
            // console.log(this.context);
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
}