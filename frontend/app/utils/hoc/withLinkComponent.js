import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_MAP } from 'farmApp/routes'
import { connect } from 'react-redux'
import { compose } from 'redux'

const mapStateToProps = state => ({
    location: state.router.location
  })

const withLinkComponent = (WrappedComponent) => {

    class LinkComponent extends React.Component {

        static propTypes = {
            to: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
            ]),
            params: PropTypes.object,
        }
    
        constructor(props) {
            super(props)
            const { routeMap = ROUTE_MAP } = props
            this.route = routeMap[props.to]
        }
    
        componentDidMount() {
            const { routeMap = ROUTE_MAP } = this.props
            this.route = routeMap[this.props.to]
        }

        componentDidUpdate(prevProps) {
            const { routeMap = ROUTE_MAP } = this.props
            if (prevProps.to !== this.props.to) {
                this.route = routeMap[this.props.to]
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
            const { to, params, dataProps, routeMap, location, dispatch: notUsed, ...rest } = this.props

            //console.debug("Location: ", location)
            const state = {
                from: location
            }
            return (
                <WrappedComponent 
                    component={
                        forwardRef((linkProps, ref) => 
                        <Link ref={ref} to={this.route? { pathname: this.route.toPath(params), state, ...dataProps} : to } {...linkProps}/>)
                    }
                    onMouseOver={this.maybePreloadComponent}
                    {...rest}
                />
            )
        }

    }

    return connect(mapStateToProps, null)(LinkComponent)
    
}
/*
const mapStateToProps = state => ({
    location: state.router.location
  })

const withLinkComponent = compose(
    connect(mapStateToProps, null),
    LinkComponent
)
*/
export default withLinkComponent