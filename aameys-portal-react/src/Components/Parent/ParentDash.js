import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import HeaderParent from '../Common/HeaderParent';
import axios from 'axios';


var mailPath = "";
var accPath = "";
export default class ParentDash extends Component {
    constructor(props){
        super(props);
        this.state = {
            students: [{'student_id':'1'}],
            parent_id:this.props.match.params.pid,
            currchild: 0
        };
        this.incrementStudentId = this.incrementStudentId.bind(this);
        this.decrementStudentId = this.decrementStudentId.bind(this);

    }
    componentDidMount(){
        mailPath = this.state.parent_id+"/mailteacher";
        accPath = this.state.parent_id+"/accinfo";
        axios.get('http://localhost:5000/getstudentbyparentid?id='+this.state.parent_id)
        .then(response => {
            console.log(response.data.length)
            console.log(response)
            if(response.data.length > 0){
            this.setState({
                students: response.data
            })}
            else{
            this.setState(
               { students: [{'student_id': 'NONE'}]}
            )
            }
        })
        .catch(err => console.log(err))
        console.log(mailPath)
    }

    incrementStudentId(){
        let cur = this.state.currchild
        if(cur>=0 && cur < this.state.students.length-1){
            cur =cur+1
            this.setState({
                currchild: cur
            })
        }
        console.log(this.state.currchild);
    }

    decrementStudentId(){
        console.log(this.state.currchild);
        let cur = this.state.currchild
        if(cur>0 && cur <= this.state.students.length){
            cur =cur-1
            this.setState({
                currchild: cur
            })
        }
    }

    render(){
        console.log(this.state);
        console.log(this.props);
        return (
            <div>
            <HeaderParent />

            <div style={{backgroundColor:"orange", marginTop:"150px",height:"400px", opacity:"0.65"}}>
            <Row style={{marginBottom:"25px"}}>
                <Col sm={2} lg={5} md = {5} />
                <Col sm={4} lg={4} md = {4}>
                    <Row style={{height:"10px", alignSelf:"center", marginBottom:"100px", marginLeft:"1px"}} className="user-dp"><img style={{height:"100px",marginLeft:"20px", marginTop:"3px"}} className="img-fluid rounded-circle" src="assets/images/profile-avatar.jpg" /></Row>  
                    <Row style={{ fontSize: "15px", fontWeight:"bold", color:"black"}} className="bold"><Link style={{marginRight:"10px"}} to={{}}><i onClick={this.decrementStudentId} className="fa fa-arrow-circle-o-left"></i></Link>Student ID {this.state.students[this.state.currchild]['student_id']}<Link  style={{marginLeft:"10px"}} to={{pathname:""}}><i onClick={this.incrementStudentId} className="fa fa-arrow-circle-o-right"></i></Link></Row>
                </Col>
                {/* <Col sm ={3} lg={1} md={1} /> */}
                <Col sm = {3} lg = {3} md = {2}>
                    <div style={{margin:"10px"}}>
                    <Link to={{pathname:accPath}}><Button style={{marginBottom:"4px", width:"70%", textAlign: "left", backgroundColor:"grey"}} type="button" className="btn btn-sm"><i style={{marginRight:"10px"}} className="fa fa-id-card-o"></i>My Account</Button></Link>
                        <Link to={{pathname:mailPath}}><Button style={{marginBottom:"4px", width:"70%", textAlign: "left", backgroundColor:"grey"}} type="button" className="btn btn-sm"><i style={{marginRight:"10px"}} className="fa fa-id-card-o"></i>Mail Teachers</Button></Link>

                    </div>
                    
                    
                </Col>
            </Row>

            <Row style={{height:"200px"}}>
            <Col sm={2} lg={1} md = {1} /> 
            <Col>
                <Card style={{height:"200px", width:"100%"}}>
                <Row>
                <Col sm={3} lg={3} md={3} style={{paddingRight:"0px"}}>
                    <CardBody style={{border:"groove", height:"200px" }} className="icon-box">
                    <div style={{textAlign:"center"}}><Link to={{pathname:  `/parent/dash/${this.state.parent_id}/${this.state.students[this.state.currchild]['student_id']}/grade`}}><i style={{ fontSize:"100px"}} className="fa fa-graduation-cap"></i>
                        <p style={{textAlign:"center"}}>View my grades.</p></Link></div>
                    </CardBody>
                </Col>
                <Col sm={3} lg={3} md={3} style={{padding:"0px"}}>
                    <CardBody style={{border:"groove", height:"200px"}}>
                    <div style={{textAlign:"center"}}><Link to={{pathname:  `/parent/dash/${this.state.parent_id}/${this.state.students[this.state.currchild]['student_id']}/attendance`}}><i style={{fontSize:"100px"}} className="fa fa-id-card-o"></i>
                         <p style={{textAlign:"center"}}>Attendance </p></Link></div>
                    </CardBody>
                </Col>
                <Col sm={3} lg={3} md={3} style={{padding:"0px"}}>
                    <CardBody style={{border:"groove", height:"200px"}}>
                    <div style={{textAlign:"center"}}><Link to={{pathname:  `/parent/dash/${this.state.parent_id}/${this.state.students[this.state.currchild]['student_id']}/schedule`}}><i style={{fontSize:"100px"}} className="fa fa-id-card-o"></i>
                         <p style={{textAlign:"center"}}>Class Schedule </p></Link></div>
                    </CardBody>
                </Col>
                <Col sm={3} lg={3} md={3} style={{paddingLeft:"0px"}}>
                    <CardBody style={{border:"groove", height:"200px", flex:"1"}}>
                    <div style={{ textAlign:"center"}}><Link to={{pathname:  `/parent/dash/${this.state.parent_id}/regchild`}}><i style={{fontSize:"100px", marginBottom:"10px"}} className="fa fa-calendar-minus-o"></i>
                         <p style={{textAlign:"center"}}>Register child </p></Link></div>
                    </CardBody>
                </Col>
                </Row>
                </Card>
                </Col>
                <Col sm={2} lg={1} md = {1} /> 
            </Row>

            </div>

            </div>
        );
    }
}