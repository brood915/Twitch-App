import React from 'react';
import PropTypes from 'prop-types';

function FinderContainerHeader(props) {
  return (<div className='header'>
  	<span>Find your favorite streamers!</span>
  	<form onSubmit = {props.handleSubmit}>
        <input type = 'text' onChange = {props.handleInput}>
        </input>
        <button type = 'button' onClick ={props.handleSubmit} className="btn btn-danger">
        Search</button>
        <button type = 'button' onClick ={props.handleDisplay} className="btn btn-warning">
        My Streamers</button></form></div>);
}

FinderContainerHeader.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDisplay: PropTypes.func.isRequired
}

export default FinderContainerHeader;