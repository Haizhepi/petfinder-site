import React from 'react';


import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import GoogleMapReact from 'js/googleMapAPI';

import {Helmet} from 'react-helmet';
import Typekit from 'react-typekit';

import postscribe from 'postscribe';


export class LocationSearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {address: ''};
    }

    handleChange = address => {
        this.setState({address});
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
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
        gmapScriptEl.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyApj8pWzBoBP9_2GjJE2PQnlcp8oanaEdw&libraries=places&callback=initMap';
        document.querySelector('body').insertAdjacentElement('beforeend', gmapScriptEl);
    }

    render() {
        return (
            <div className="container padded">
                <div className="row">
                    <div className="col-6 offset-md-3" id="p">
                        <div className="title">Enter Your Address</div>
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
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                                    : {backgroundColor: '#ffffff', cursor: 'pointer'};
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
