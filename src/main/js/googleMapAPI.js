import React from 'react';

import GoogleMapReact from 'google-map-react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import { } from 'react-places-autocomplete';


import Geocode from 'react-geocode';

const AnyReactComponent = ({text}) => <div>{text}</div>;

export class GoogleMapAPI extends React.Component {
    static defaultProps = {
        center: {
            lat: 31.54,
            lng: -97.11
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '100%', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyApj8pWzBoBP9_2GjJE2PQnlcp8oanaEdw'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={31.5497}
                        lng={-97.1143}
                        text='My Marker'
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
            apiKey: props.apiKey
        }
    ))(GoogleMapAPI);
