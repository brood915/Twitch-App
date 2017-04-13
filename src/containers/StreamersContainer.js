import StreamersContainerHeader from '../components/StreamersContainerHeader';
import StreamersContainerResult from '../components/StreamersContainerResult';
import React from 'react';
const PropTypes = React.PropTypes;

function StreamersContainer(props) {
  return (<div className = 'displayContainer'>
  	<StreamersContainerHeader 
  	handleDisplay = {props.handleDisplay} handleShowing = {props.handleShowing} />
  	<StreamersContainerResult streamers = {props.streamers} 
  	getStreamer = {props.getStreamer} /></div>);
}


StreamersContainer.propTypes = {
  handleDisplay: PropTypes.func.isRequired,
  handleShowing: PropTypes.func.isRequired,
  getStreamer: PropTypes.func.isRequired,
  streamers: PropTypes.array.isRequired
}


export default StreamersContainer;

