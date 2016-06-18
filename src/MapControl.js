/* @flow */

import { Component } from 'react'

import controlPositionType from './types/controlPosition'
import mapType from './types/map'

export default class MapControl extends Component {
  leafletElement: Object;

  static propTypes = {
    position: controlPositionType,
  };

  static contextTypes = {
    map: mapType,
  };

  componentDidMount () {
    this.leafletElement.addTo(this.context.map)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setPosition(this.props.position)
    }
  }

  componentWillUnmount () {
    this.leafletElement.removeFrom(this.context.map)
  }

  getLeafletElement () {
    // TODO: add warning form v0.12
    return this.leafletElement
  }

  render () {
    return null
  }
}
