import React from 'react';
import '../Styles/home.css';
import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component {
    render() {
        const { brandtypesData } = this.props;
        return (
            <div>
                <div className="quicksearch">
                    <p className="quicksearchHeading">
                        Quick Searches
                    </p>
                    <p className="quicksearchSubHeading">
                        Discover mobiles by type of brand
                    </p>

                    <div className="container-fluid">
                        <div className="row">
                            {brandtypesData.map(item => {
                                return <QuickSearchItem
                                    heading={item.name}
                                    description={item.content}
                                    image={item.image}
                                    id={item.brand_type}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuickSearch;