import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PostData from "./data/post.json";
import { 
  Map, 
  GoogleApiWrapper, 
  InfoWindow, 
  Marker } from 'google-maps-react';

export class MapContainer extends Component {

  // Contructor

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }


  render() {

    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    };

 

    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }

        defaultZoom={8} 
        initialCenter = {{ 
          lat: 41.885770, 
          lng: -87.665610 }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ 
            lat: 41.885770, 
            lng: -87.665610}}
          name = { 'Changing Colors Garage' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography>
            <div>
              {PostData.map((postDetail, index) => {
                return (
                  <div>
                    <h1>{postDetail.title}</h1>
                    <p>{postDetail.content}</p>
                    <p>Current Land:{postDetail.CURRENT_LAND}</p>
                    <p>Building: {postDetail.CURRENT_BUILDING}</p>
                    <p>LOC:{postDetail.LOC}</p>
                    <p>Neighborhood:{postDetail.NEIGHBORHOOD}</p>
                    <p>Full Bath: {postDetail.FULL_BATH}</p>
                    <p>BSMT:{postDetail.BSMT_DESC}</p>
                    <p>AC:{postDetail.AC}</p>
                    <p>Building Sq Ft:{postDetail.BUILDING_SQ_FT}</p>
                  </div>
                );
              })}
          </div>
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'API KEY HERE'
})(MapContainer);