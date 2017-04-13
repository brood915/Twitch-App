import React from 'react';
const PropTypes = React.PropTypes;


function StreamersContainerResult(props) {
  return (<div>{props.streamers.map(function(each)
{
  return (<div>{props.getStreamer(each[0], each[1])}</div>);
})}</div>);

}


StreamersContainerResult.propTypes = {
  streamers: PropTypes.array.isRequired,
  getStreamer: PropTypes.func.isRequired
}

export default StreamersContainerResult;