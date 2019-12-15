import React from 'react';
import { connect } from 'react-redux';
import { stateMapper } from '../store/store'

class HeaderComponent extends React.Component {
    totalConverted = (total, item) => {
        if (item[1].converted === true) {
            total++;
        }
        return total;
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="h4">Potential Leads</h1>
                    </div>
                    <div className="col-md-6 text-right">
                        <h4>Converted: 
                        <span className="badge badge-primary pull-right">{
                                this.props.students.reduce(this.totalConverted, 0)
                            } / {this.props.students.length}</span>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

let Header = connect(stateMapper)(HeaderComponent)
export default Header;