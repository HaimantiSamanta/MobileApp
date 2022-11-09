import React from 'react';
import '../Styles/home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            series: [],
            inputText: undefined,
            suggestions: []
        }
    }

    handleFeatureChange = (event) => {
        const featureId = event.target.value;
        sessionStorage.setItem('featureId', featureId);

        axios({
            method: 'GET',
            url: `http://localhost:4475/series/${featureId}`,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ series: response.data.series, inputText: '' })
            })
            .catch()
    }

    handleSearch = (event) => {
        const { series } = this.state;
        const inputText = event.target.value;

        const suggestions = series.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions });
    }

    selectingSerie = (serObj) => {
        this.props.history.push(`/details?serie=${serObj._id}`);
    }

    showSuggestion = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length == 0 && inputText == undefined) {
            return null;
        }
        if (suggestions.length > 0 && inputText == '') {
            return null;
        }
        if (suggestions.length == 0 && inputText) {
            return <ul >
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingSerie(item)}>{`${item.name} -   ${item.battery},${item.camera}`}</li>))
                }
            </ul>
        );

    }

    render() {
        const { featuresData, inputText } = this.props;
        return (
            <div>
                {/* Adding Wallpaper */}
                <img src="./Assets/wallpaper.webp" width="100%" height="450" />
                <div>
                    <div className="headings">
                        Find the best Mobiles
                    </div>

                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handleFeatureChange}>
                            <option value="0">Select</option>
                            {featuresData.map((item) => {
                                return <option value={item.feature_id}>{`${item.name}, ${item.camera}`}</option>
                            })}
                        </select>
                        <div>
                            <span className="glyphicon glyphicon-search search"></span>
                            <div id="notebooks">
                                <input id="query" className="restaurantsinput" type="text" value={inputText}
                                    placeholder="What are you looking for ?" onChange={this.handleSearch} />
                                {this.showSuggestion()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Wallpaper);