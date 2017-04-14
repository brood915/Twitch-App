import React from 'react';
const PropTypes = React.PropTypes;

function FinderContainerResult(props) {
  if (Object.keys(props.streamer).length === 0) { //before search
    return (<div className = "result">Search for your favorite twitch streamer!</div>);
  } else if (props.streamer[1].hasOwnProperty('status') === true) {
    return (<div className = "result">No Such Twitch Streamer Was Found. Try again!</div>);
  } else {
    return (<div>{props.getStreamer(props.streamer[0],props.streamer[1])}</div>);
  }
}

FinderContainerResult.propTypes = {
  streamer: PropTypes.array.isRequired,
  getStreamer: PropTypes.func.isRequired
}


export default FinderContainerResult;