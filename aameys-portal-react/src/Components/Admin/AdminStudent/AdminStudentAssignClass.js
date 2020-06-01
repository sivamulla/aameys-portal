import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



const teachers = [{
    "class":"English",
    "Students":"3"
},
{
    "class":"Maths",
    "Students":"3"
},
{
    "class":"kacn",
    "Students":"3"
},
{
    "class":"as",
    "Students":"3"
}
,
{
    "class":"sda",
    "Students":"3"
}]
export default class AdminStudentAssignClass extends Component{
    constructor(props){
        super(props);
        this.state={
            selected:[],
            classes:[],
            student_name:"student1"
        }
    }

    componentDidMount(){
        this.setState(
            {
                classes: teachers
            }
        );
    }

    render(){
    const selectRowProp = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: this.onSelect,
        className: this.selectedRowClass
    };
    return(
        <div>
             <div style={{backgroundColor:"orange",height:"550px", opacity:"0.65"}}> 
             <Row className="page-title">
      
                <Col style={{margin:"10px"}} sm={6} lg={4} >
                    <Breadcrumb className="float-left float-sm-left">
                    <BreadcrumbItem><a href="#">Administrator</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="#">Students</a></BreadcrumbItem>
                    <BreadcrumbItem ><a href="#">{this.state.student_name}</a></BreadcrumbItem>
                    <BreadcrumbItem actice>Assign class</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
            <Col lg={3} md={3} sm={3} className="mb-30"></Col>
                <Col lg={6} md={6} sm={6} className="mb-30">
                    <div style={{width:"80%"}}>
                        <CardBody>
                            <div className="user-bg parallax" style={{backgroundColor:"white"}}>
                                <div style={{height:"150px"}} className="user-info">
                                    <Row>
                                        <Col lg={4} md={4} className="align-self-center">
                                            <div className="user-dp"><img style={{ margin: "10px", textAlign:"center", height:"100px"}} className="img-fluid rounded-circle" src="assets/images/profile-avatar.jpg" /></div>
                                        </Col>
                                        
                                        <Col>
                                            <div className="user-detail">
                                            
                                                <h2 style={{fontSize:"18px", fontWeight:"bolder"}} className="name">Student Info</h2>
                                                <p>Name: </p>
                                                <p>Student id: </p>
                                                <p>Phone: </p>
                                                <p>Term: </p>
                                                <p>Classes: </p>
                                            </div>
                                        </Col>
                                       
                                    </Row>
                                    
                                </div>
                            </div>
                        </CardBody>
                        <Row>
                        <Col lg={4} md={4} sm={4}>
                        <Button style={{marginBottom:"4px",marginLeft:"20px", width:"150%", textAlign: "left", backgroundColor:"grey"}} type="button" className="btn btn-sm"><i style={{marginRight:"10px"}} className="fa fa-id-card-o"></i>Assign Students to class</Button>
                        </Col>  
                        <Col lg={2} md={2} sm={2}></Col>
                        <Col lg={4} md={4} sm={4}>
                        <Button style={{marginBottom:"4px",marginLeft:"", width:"150%", textAlign: "left", backgroundColor:"grey"}} type="button" className="btn btn-sm"><i style={{marginRight:"10px"}} className="fa fa-id-card-o"></i>Remove Students from class</Button>
                        </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={3}>
                <div style={{margin:"10px"}}>
                    <Button style={{marginBottom:"4px", width:"70%", textAlign: "left", backgroundColor:"grey"}} type="button" className="btn btn-sm"><i style={{marginRight:"10px"}} className="fa fa-id-card-o"></i>Save changes</Button>
                </div>
                </Col>
            </Row>
            <Row style={{height:"200px"}}>
                <Col xl={12} className="mb-30">
                <Card style={{margin: "10px"}}>
                    <CardBody>
              
                    <BootstrapTable
                            data={this.state.classes}
                            pagination
                            selectRow={selectRowProp}
                            tableStyle={{height:"100px"}}
                            >
                            <TableHeaderColumn width='100' dataField='class' isKey={true}>Class Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField="Students">Students</TableHeaderColumn>
                    </BootstrapTable>
                    </CardBody>
                </Card>
            </Col>
            </Row>
            </div>
        </div>
    );
}


}