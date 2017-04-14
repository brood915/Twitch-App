import React from 'react';
import PropTypes from 'prop-types';


function StreamersContainerHeader(props) {
  return (<div className='header'>
  	<span>Status of your favorite streamers</span>
  	<button type = 'button' onClick ={props.handleShowing} 
  	className="btn btn-success" id = 'all'>All</button>
  	<button type = 'button' onClick ={props.handleShowing} 
  	className="btn btn-warning" id = 'online'>Online</button>
  	<button type = 'button' onClick ={props.handleShowing} 
  	className="btn btn-danger" id = 'offline'>Offline</button>
  	<button type = 'button' onClick ={props.handleDisplay} 
  	className="btn btn-primary">Search</button>
	</div>);
}



StreamersContainerHeader.propTypes = {
  handleShowing: PropTypes.func.isRequired,
  handleDisplay: PropTypes.func.isRequired
}

export default StreamersContainerHeader;