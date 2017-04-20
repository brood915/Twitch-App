import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import StreamersContainer from './StreamersContainer';
import FinderContainer from './FinderContainer';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      adding: 'Add',
      storage: JSON.parse(window.localStorage.getItem('streamers')) || [],
      showing: 'all',
      value: '',
      streamer: [],
      streamers: []
    }

    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdding = this.handleAdding.bind(this);
    this.handleDeleting = this.handleDeleting.bind(this);
    this.handleShowing = this.handleShowing.bind(this);
    this.getStreamer = this.getStreamer.bind(this);
  }

  getStreamer(obj1, obj2) {
    if (obj2.hasOwnProperty('status') === true) { //if already added user's channel is closed
      return (<div className='savedContent result'><div>{obj2.name} Not Found!</div><button type = 'button' onClick ={this.handleDeleting} className="btn btn-danger">Delete</button></div>);
    } else {
      return (<div className='savedContent result'><a href={'https://www.twitch.tv/'+ obj2.name} target ='_blank'><img src={obj2.logo} alt ='No img found'/></a><div>Name: {obj2.display_name}</div><div>Status: {obj1.stream === null ? 'Offline' : 'Online'}</div><button value = {obj2.name} type = 'button' onClick ={this.state.searching === false ? this.handleDeleting : this.handleAdding} className="btn btn-danger">{this.state.searching === false ? 'Delete' : this.state.adding}</button></div>)
    }
  }

  getData(value, type, data) {

    let urls = ['https://wind-bow.gomix.me/twitch-api/streams/' + value, 'https://wind-bow.gomix.me/twitch-api/users/' + value];

    //had to use fetchJsonp instead of fetch bc of CORS problem
    const getJson = url => fetchJsonp(url).then(res => res.json());
    Promise.all(urls.map(getJson))
      .then((values) => {
        if (type === "search") {
          this.setState({
            streamer: values
          });
        } else {
          data.push([values[0], values[1]]);
          window.localStorage.setItem('streamersInfo', JSON.stringify(data));
          this.setState({
            streamers: data
          });
        }
      }).catch(err => {
        console.log('Something went wrong...')
      });
  }

  handleData() {
    let elements = [];
    let names = this.state.storage;
    Promise.all(names.map((each, index) =>
      this.getData(each, "", elements))).catch((err) => console.log('problem'));
  }

  componentWillMount() {
    this.handleData();
  }

  handleShowing(e) {
    let showing = e.target.getAttribute('id');
    let streamers = JSON.parse(window.localStorage.getItem('streamersInfo')) || [];
    if (showing === 'all') {
      this.setState({
        showing: 'all',
        streamers
      });
    } else if (showing === 'online') {
      this.setState({
        showing: 'online',
        streamers: streamers.filter((each) => each[0].stream !== null)
      });
    } else {
      this.setState({
        showing: 'offline',
        streamers: streamers.filter((each) => each[0].stream === null)
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value !== '') {
      this.getData(this.state.value, "search");
    }
    this.setState({
      adding: 'Add',
      value: ''
    });
  }

  handleDeleting(e) {
    const value = e.target.getAttribute('value');
    const names = this.state.storage;
    const streamers = JSON.parse(window.localStorage.getItem('streamersInfo')) || [];

    for (let i = 0; i < names.length; i++) {
      if (value === names[i]) {
        let filtered;
        filtered = streamers.filter((each) => each[1].name !== names[i]);
        names.splice(i, 1);
        this.setState({
          storage: names,
          streamers: filtered
        }, () => {
          window.localStorage.setItem('streamers', JSON.stringify(names));
          window.localStorage.setItem('streamersInfo', JSON.stringify(filtered));
        });
      }
    }
  }

  handleAdding() {
    let names = this.state.storage;
    let found = false;
    found = names.some((each) => {
      return each === this.state.streamer[1].name;
    });
    if (found === true) {
      this.setState({
        adding: 'Already On the List!'
      });
    } else {
      names.push(this.state.streamer[1].name);
      this.setState({
        adding: 'Added!',
        storage: names
      }, () => {
        window.localStorage.setItem('streamers', JSON.stringify(names));
      });
    }
    this.handleData(); //to refresh status of streamers
  }

  handleInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleDisplay() {
    this.setState({
      searching: !this.state.searching,
      streamer: [],
      showing: 'all'
    });
    this.handleData(); //to refresh status of streamers
  }

  render() {
    let display = this.state.searching === false ? <StreamersContainer handleDisplay = {this.handleDisplay} handleShowing = {this.handleShowing} streamers = {this.state.streamers} getStreamer = {this.getStreamer} /> : <FinderContainer handleInput = {this.handleInput} handleDisplay = {this.handleDisplay} handleSubmit = {this.handleSubmit} streamer ={this.state.streamer} getStreamer = {this.getStreamer} />
    return (<div>{display}</div>)
  }
}

export default MainContainer;
