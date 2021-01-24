import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      employee:[],
      isLoading:false,
      isError:false
    };
  }

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const res=await fetch("http://localhost:8080/api/test/all")

    if(res.ok)
    {
      const employee=await res.json()
      console.log(employee);
      this.setState({employee,isLoading:false})
    }
    else {
      this.setState({isError:true,isLoading:false})
    }


    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true})
  }
  editEmployee=(id)=>{
    this.props.history.push(`/update/${id}`);
  }
  AddEmployee=()=>{
    this.props.history.push(`/Adding`);
  }
  renderTableheader=()=>
  {
      return Object.keys(this.state.employee[0]).map(attr=>
        <th key={attr}>
        {attr.toUpperCase()}
        {""}
        {""}</th>
      )
  }

  deleteemp=(id)=>{
    axios.delete("http://localhost:8080/api/test/all/"+id)
    .then(response=>{
      if(response.data!=null){
          this.setState({"show":true});
          setTimeout(()=>this.setState({"show":false}),3000);
          this.setState({
            employee:this.state.employee.filter(e=>e.id!==id)
          });
      }else{
        this.setState({"show":false});
      }

    });
  };

  renderTablerows=()=>
  {
      return this.state.employee.map(user=> {
          return (
      <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.empid}</td>
          <td>{user.username}</td>
          <td><button onClick={()=>this.editEmployee(user.id)}>Update</button></td>
          <td><button onClick={this.deleteemp.bind(this,user.id)}>Delete</button></td>

      </tr>
    )
  })
  }
  render() {
    const {employee,isLoading,isError}=this.state

    return employee.length > 0
    ?(
      <div>
      <button onClick={()=>this.AddEmployee()}>Add employee</button>

      <br/>
      <div>
      <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        <thead style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
          <tr style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
          {this.renderTableheader()}
          </tr>
        </thead>
        <tbody style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        {this.renderTablerows()}
        </tbody>
      </table>
      </div>
      </div>

    ):(
      <div>No users</div>
    )

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>

      </div>: null}
      </div>
    );
  }
}
