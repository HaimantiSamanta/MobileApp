import React from 'react';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSeach';

import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            features: [],
            brandtypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:4475/features',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ features: response.data.features })
            })
            .catch()

        axios({
            method: 'GET',
            url: 'http://localhost:4475/brandtypes',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ brandtypes: response.data.brandtypes })
            })
            .catch()
    }

    render() {
        const { features, brandtypes } = this.state;
        return (
            <div>
                <Wallpaper featuresData={features} />
                <QuickSearch brandtypesData={brandtypes} />
            </div>
        )
    }
}

export default Home;