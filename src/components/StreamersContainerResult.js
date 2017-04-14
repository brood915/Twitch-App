import React from 'react';
import PropTypes from 'prop-types';


function StreamersContainerResult(props) {
  return (<div>{props.streamers.map(function(each)
{
  return (<div key = {each[1]['_id'].toString()}>{props.getStreamer(each[0], each[1])}</div>);
})}</div>);

}


StreamersContainerResult.propTypes = {
  streamers: PropTypes.array.isRequired,
  getStreamer: PropTypes.func.isRequired
}

export default StreamersContainerResult;