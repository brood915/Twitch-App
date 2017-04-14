import React from 'react';
const PropTypes = React.PropTypes;
import FinderContainerHeader from '../components/FinderContainerHeader';
import FinderContainerResult from '../components/FinderContainerResult';

function FinderContainer(props) {
  return (<div className = 'displayContainer'>
  	<FinderContainerHeader 
  	handleDisplay = {props.handleDisplay} handleInput = {props.handleInput} 
  	handleSubmit = {props.handleSubmit} />
  	<FinderContainerResult streamer = {props.streamer} 
  	getStreamer = {props.getStreamer} /></div>);

}

FinderContainer.propTypes = {
  handleDisplay: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getStreamer: PropTypes.func.isRequired,
  streamer: PropTypes.array.isRequired
}


export default FinderContainer;