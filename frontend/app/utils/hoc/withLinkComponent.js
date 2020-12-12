import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_MAP } from 'routes'


const withLinkComponent = (WrappedComponent) => {

    return class extends React.Component {

        static propTypes = {
            to: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
            ]),
            params: PropTypes.object,
        }
    
        constructor(props) {
            super(props)
            this.route = ROUTE_MAP[props.to]
        }
    
        componentDidMount() {
            this.route = ROUTE_MAP[this.props.to]
        }

        componentDidUpdate(prevProps) {
            if (prevProps.to !== this.props.to) {
                this.route = ROUTE_MAP[this.props.to]
            }            
        }
    
        // TODO: Use debounced callback here
        // Maybe: https://github.com/xnimorz/use-debounce
        maybePreloadComponent = () => {
            const { onMouseOver = null } = this.props
            onMouseOver && onMouseOver()

            if (!this.route) {
                return
            }
    
            const { component } = this.route
            if (component && _.isFunction(component.preload)) {
                component.preload()
            }
            
        }
    
        render() {
            const { to, params, dataProps, ...rest } = this.props
            return (
                <WrappedComponent 
                    component={
                        forwardRef((linkProps, ref) => 
                        <Link ref={ref} to={this.route? { pathname: this.route.toPath(params), ...dataProps} : to } {...linkProps}/>)
                    }
                    onMouseOver={this.maybePreloadComponent}
                    {...rest}
                />
            )
        }
    }
    
}


export default withLinkComponent