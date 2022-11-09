import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/filter.css';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            series: [],
            features: [],
            brandtype: undefined,
            feature: undefined,
            speciality: [],
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1,
            pageCount: []
        }
    }

    componentDidMount() {
       
        const qs = queryString.parse(this.props.location.search);
        
        const { brandtype, feature } = qs;

        const filterObj = {
            brandtype: Number(brandtype),
            feature
        };

        axios({
            method: 'POST',
            url: 'http://localhost:4475/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({series: response.data.series, brandtype, pageCount: response.data.pageCount })
            })
            .catch()

        axios({
            method: 'GET',
            url: 'http://localhost:4475/features',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ features: response.data.features })
            })
            .catch()
    }

    handleSortChange = (sort) => {

        const { brandtype, speciality, feature, lcost, hcost, page } = this.state;

        const filterObj = {
            brandtype: Number(brandtype),
            speciality: speciality.length == 0 ? undefined : speciality,
            feature,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:4475/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ series: response.data.series, sort, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handleCostChange = (lcost, hcost) => {

        const { brandtype, speciality, feature, sort, page } = this.state;

        const filterObj = {
            brandtype: Number(brandtype),
            speciality: speciality.length == 0 ? undefined : speciality,
            feature,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:4475/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ series: response.data.series, lcost, hcost, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handleFeatureChange = (event) => {
        const feature = event.target.value;

        const { brandtype, speciality, lcost, hcost, sort, page } = this.state;

        const filterObj = {
            brandtype: Number(brandtype),
            speciality: speciality.length == 0 ? undefined : speciality,
            feature,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:4475/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ series: response.data.series, feature, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handlePageChange = (page) => {

        const { brandtype, speciality, feature, lcost, hcost, sort } = this.state;

        const filterObj = {
            brandtype: Number(brandtype),
            speciality: speciality.length == 0 ? undefined : speciality,
            feature,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:4475/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ series: response.data.series, page, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handleSpecialityChange = (specialityId) => {

        const { brandtype, speciality, feature, lcost, hcost, sort, page } = this.state;

        const index = speciality.indexOf(specialityId);

        if (index == -1) {
            speciality.push(specialityId);
        } else {
            speciality.splice(index, 1);
        }

        const filterObj = {
            brandtype: Number(brandtype),
            speciality: speciality.length == 0 ? undefined : speciality,
            feature,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:4475/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ series: response.data.series, speciality, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handleNavigate = (resId) => {
        this.props.history.push(`/details?serie=${resId}`);
    }

    render() {
        const { series, features, pageCount } = this.state;
        return (
            <div>
                <div>

                    <div id="myId" className="heading">Mobiles</div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                                <div className="filter-heading">Filters / Sort</div>
                                <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                    data-target="#filter"></span>
                                <div id="filter" className="collapse show">
                                    <div className="Select-Location">SELECT BATTERY CAPACITY AND PRIMARY CAMERA</div>
                                    <select className="Rectangle-2236" onChange={this.handleFeatureChange}>
                                        <option value="0">Select</option>
                                        {features.map((item) => {
                                            return <option value={item.feature_id}>{`${item.name}, ${item.camera}`}</option>
                                        })}
                                    </select>
                                    <div className="Cuisine">FEATURES</div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleSpecialityChange(1)} />
                                        <span className="checkbox-items">Dual SIM</span>
                                    </div>
                                    <div style={{ display: "block" }} >
                                        <input type="checkbox" onChange={() => this.handleSpecialityChange(2)} />
                                        <span className="checkbox-items">Single SIM</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleSpecialityChange(3)} />
                                        <span className="checkbox-items">Dual lens</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleSpecialityChange(4)} />
                                        <span className="checkbox-items">Triple lens</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleSpecialityChange(5)} />
                                        <span className="checkbox-items">Quad lens</span>
                                    </div>
                                    <div className="Cuisine">BUDGET</div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 5000)} />
                                        <span className="checkbox-items">Less than &#8377; 5000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(5000, 10000)} />
                                        <span className="checkbox-items">&#8377; 5000 to &#8377; 10000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(10000, 15000)} />
                                        <span className="checkbox-items">&#8377; 10000 to &#8377; 15000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(15000, 20000)} />
                                        <span className="checkbox-items">&#8377; 15000 to &#8377; 20000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(20000, 500000)} />
                                        <span className="checkbox-items">&#8377; 20000 +</span>
                                    </div>
                                    <div className="Cuisine">SORT</div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(1)} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} />
                                        <span className="checkbox-items">Price high to low</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-8">


                                {series.length > 0 ? series.map(item => {
                                    return <div className="Item" onClick={() => this.handleNavigate(item._id)}>
                                        <div>
                                            <div className="small-item vertical">
                                                <img className="img" src={`./${item.image}`} />
                                            </div>
                                            <div className="big-item">
                                                <div className="rest-name">{item.name}</div>
                                                <div className="rest-location">{item.battery}</div>
                                                <div className="rest-address">{item.camera}</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="margin-left">
                                                <div className="Bakery">FEATURES : {item.speciality.map(specialityItem => { return `${specialityItem.name}, ` })}</div>
                                                <div className="Bakery">STARTING FROM : &#8377; {item.min_price} </div>
                                            </div>
                                        </div>
                                    </div>
                                }) : <div className='no-records'>No Records Found ...</div>}


                                {series.length > 0 ?
                                    <div className="pagination">
                                        <span className="page-num">&laquo;</span>
                                        {pageCount.map(pageNo => {
                                            return <span className="page-num" onClick={() => this.handlePageChange(pageNo)}>{pageNo}</span>
                                        })}
                                        < span className="page-num" >&raquo;</span>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Filter;