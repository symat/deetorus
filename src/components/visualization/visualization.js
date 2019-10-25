import React from "react";
import Graph3D from './graph-3d';
import PropTypes from "prop-types";
import { Icon, Menu } from 'semantic-ui-react';

class Visualization extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, activeItem: 'graph-3d' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState(Object.assign({}, this.state, { width: window.innerWidth, height: window.innerHeight }));
  }

  handleItemClick = (e, { name }) => this.setState(Object.assign({}, this.state, { activeItem: name }));

  renderMenu() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled' 
            vertical compact
            size='small'  
            style={{ margin: '2em 2em 2em -4em' ,
                     float: 'left',
                     position: 'absolute',
                     left: '80px',
                     zIndex: 10,
                  }}
      >
        <Menu.Item
          name='graph-3d'
          active={activeItem === 'graph-3d'}
          onClick={this.handleItemClick}
        >
          <Icon name='connectdevelop' />
          3D Graph
        </Menu.Item>

        <Menu.Item
          name='graph-2d'
          active={activeItem === 'graph-2d'}
          onClick={this.handleItemClick}
        >
          <Icon name='share alternate' />
          2D Graph
        </Menu.Item>

        <Menu.Item
          name='table'
          active={activeItem === 'table'}
          onClick={this.handleItemClick}
        >
          <Icon name='table' />
          Table
        </Menu.Item>
      </Menu>
    )
  }

  renderVisualization() {
    if( this.state.activeItem === 'graph-3d' ) {
      return (
        <Graph3D dispatch={this.props.dispatch} 
                 dataModel={this.props.dataModel} 
                 width={this.state.width}
                 height={this.state.height-100}
                 />
      )
    } else return null;
  }

  render() {
    return (
      <div>
        {this.renderMenu()}
        {this.renderVisualization()}
      </div>
    );
  }
}

Visualization.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataModel: PropTypes.object.isRequired 
};

export default Visualization;