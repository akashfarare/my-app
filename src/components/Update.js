import React, { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from "../services/user.service";

export default class Update extends Component{
  constructor(props){
    super(props)
    this.state={
        id:this.props.match.params.id,
        empid:'',
        username1:''
    }

  }
  onChangeempid=(e)=>{
    this.setState({empid:e.target.value});
  }
  onChangeempname=(e)=>{
    this.setState({empname:e.target.value});
  }
  componentDidMount(){
    UserService.getEmployeeById(this.state.id).then((res)=>{
      console.log(res.data)
      let employee=res.data;
      this.setState({empid:employee.empid
      });
      this.setState({username1:employee.username});
    });
  }
  updateEmployee=(e)=>{
    e.preventDefault();

    let employee={empid:this.state.empid,username:this.state.empname};
    console.log(JSON.stringify(employee));
    UserService.updateEmployee(employee,this.state.id).then(res=>{
      this.props.history.push(`/profile`);
    });
  }

  render(){
    return(
      <div>
      <div className="col-md-12">
        <div className="card card-container">
          <h3>Update Employee</h3>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label >ID</label>
              <Input
              placeholder="Employee ID"
                type="number"
                className="form-control"
                name="username"
                value={this.state.empid}
                onChange={this.onChangeempid}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Emp name`">Employee Name</label>
              <Input
              placeholder="Employee Name"
                type="text"
                className="form-control"
                name="empname"
                value={this.state.username1}
                onChange={this.onChangeempname}            />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={this.updateEmployee}
              >
                <span>Save</span>
              </button>
            </div>

          </Form>
        </div>
      </div>
      </div>
    )
    }
  }
