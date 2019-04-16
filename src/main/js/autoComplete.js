import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import GoogleMapReact from 'js/googleMapAPI';

import {Helmet} from 'react-helmet';
import Typekit from 'react-typekit';

import postscribe from 'postscribe';
import Geocode from 'react-geocode';


Geocode.setApiKey('AIzaSyCtDc6Y9UHdQHwR--vCIFQ56sLOmlBp2dM');
Geocode.enableDebug();

export class LocationSearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: '',
                lng: ''
            },
            markerPosition: {
                lat: '',
                lng: ''
            }
        };
    }

    handleChange = address => {
        console.log(this.state);
        this.setState({address});
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                getLatLng(results[0]);
                console.log('ppp');

                console.log(results[0].formatted_address);
            })
            .then(latLng => {
                // const geocoding = new require('reverse-geocoding');
                console.log('Success', latLng);
                // let config = {
                //     'latitude': latLng.lat,
                //     'longitude': latLng.lng
                // };
                // //let geocoding = 'aa';
                // geocoding.location(config, function (err, data) {
                //     if (err) {
                //         console.log(err);
                //     }else {
                //         console.log(data);
                //     }
                // });
            })
            .catch(error => console.error('Error', error));
    };

    state = {
        gmapsLoaded: false,
    };

    initMap = () => {
        this.setState({
            gmapsLoaded: true,
        });
    };

    componentDidMount() {
        window.initMap = this.initMap;
        const gmapScriptEl = document.createElement('script');
        gmapScriptEl.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCtDc6Y9UHdQHwR--vCIFQ56sLOmlBp2dM&libraries=places&callback=initMap';
        document.querySelector('body').insertAdjacentElement('beforeend', gmapScriptEl);
    }

    render() {
        return (
            <div className="container padded">
                <div className="row">
                    <div className="col-6 offset-md-3" id="p">
                        <div className="title topMarg1">Enter Your Address</div>
                        {this.state.gmapsLoaded && (

                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            >
                                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Search Your Address Here...',
                                                className: 'location-search-input form-control',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container adc">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? {backgroundColor: 'transparent', cursor: 'pointer'}
                                                    : {backgroundColor: '#434343', cursor: 'pointer'};
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        )}
                    </div>
                </div>
            </div>

        );
    }
}
