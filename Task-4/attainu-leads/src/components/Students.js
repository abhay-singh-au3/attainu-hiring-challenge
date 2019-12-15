import React from 'react';
import { connect } from 'react-redux';
import { stateMapper } from '../store/store'

class StudentsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "all",
            data: this.props.students
        }
    }

    getLead = () => {
        this.props.dispatch({
            type: "GET_LEAD"
        })
        this.setState({
            data: this.props.students
        })
    }

    checked = (email) => {
        this.props.dispatch({
            type: "CONVERTED",
            email: email
        })
    }

    filterMale = () => {
        const newData = this.props.students.filter(obj => {
            return obj[0].gender === "male";
        })
        this.setState({
            filter: "male",
            data: newData
        })
    }
    filterFemale = () => {
        const newData = this.props.students.filter(obj => {
            return obj[0].gender === "female";
        })
        this.setState({
            filter: "female",
            data: newData
        })
    }

    showAll = () => {
        this.setState({
            filter: "showAll",
            data: this.props.students
        })
    }

    totalConverted = (total, item) => {
        if (item[1].converted === true) {
            total++;
        }
        return total;
    }

    render() {
        return (
            <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="h4">Potential Leads</h1>
                    </div>
                    <div className="col-md-6 text-right">
                        <h4>Converted: 
                        <span className="badge badge-primary pull-right">{
                                this.state.data.reduce(this.totalConverted, 0)
                            } / {this.state.data.length}</span>
                        </h4>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn btn-primary mb-5" onClick={this.getLead}>
                            Get New Lead
                        </button>
                    </div>
                    <div className="col-md-3"><button className="btn btn-info" onClick={this.filterMale}>Show Males</button></div>
                    <div className="col-md-3"><button className="btn btn-success" onClick={this.filterFemale}>Show Females</button></div>
                    <div className="col-md-3"><button className="btn btn-secondary" onClick={this.showAll}>Show All</button></div>                  
                </div>

                {
                    this.state.data.length === 0 ? <div className="h4 mt-5">No students leads yet</div> : this.state.data.map(obj =>
                        <div className="card mb-3" key={obj[0].cell}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={obj[0].picture.large} className="card-img" alt="img" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Name: {obj[0].name.first} {obj[0].name.last}</h5>
                                        <h5 className="card-title">Gender: {obj[0].gender}</h5>
                                        <h5 className="card-title">Email: {obj[0].email}</h5>
                                        <h5 className="card-title">Phone: {obj[0].phone}</h5>
                                        <input type="checkbox" className="form-check-input ml-5" checked={obj[1].converted} onChange={() => this.checked(obj[0].email)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            </div>
        )
    }
}

let Students = connect(stateMapper)(StudentsComponent);

export default Students;