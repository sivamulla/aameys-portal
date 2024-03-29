import React, { Component } from 'react';
import { Row, Col, Card, CardBody,Modal, ModalHeader, ModalFooter, ModalBody, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderTeacher from '../Common/HeaderTeacher';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DatePicker from 'react-datepicker';





export default class TeacherClassAttendance extends Component {
    constructor(props){
        super(props);
        this.state = {
            teachers : [],
            students:[],
            teacher_id: this.props.match.params.id,
            class_id:this.props.match.params.cid,
            grade:[],
            selected: [],
            class_name:"",
            first_name:"",
            modal:false,
            last_name:"",
            student_count:"",
            term:"",
            class:{"class_name":"","term":""}
            
        }
        this.save = this.save.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
        this.studentFormatter = this.studentFormatter.bind(this);
        this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
    }
    

    save(){

        if(this.state.selected.length > 0){
            this.toggle()
        let body = {
            sel: this.state.selected,
            class_id: this.state.class_id
        }
        console.log(body)
        axios(
            {
              method: 'post',
              url: 'http://localhost:5000/addGradesByTeacherByClass',
              data: body,
              headers: {'Content-Type': 'application/json' }
            }
          )
          .then(res => {console.log(res)
            this.toggle()
            })
          .catch(res => {console.log(res)
            this.toggle()
        })}
    }

    toggle(){
        this.setState(
          {
            modal: !this.state.modal
          }
        )
      }


    componentDidMount(){

        // axios.get('http://localhost:5000/gradesByClassId?id='+this.state.class_id)
        // .then(res => {
        //     console.log('rda')
        //     console.log(res)
        //     this.setState({
        //         grade: res.data
        //     })
        // })
        // .catch(err => {console.log(err)
        //             console.log('rtghjm')
        // })

        axios.get('http://localhost:5000/gradesByClassId?id='+this.state.class_id)
        .then(res => {
            console.log(res)
            this.setState({grade: res.data})
        })
        .catch(err => console.log(err))

        axios.get('http://localhost:5000/getclassbyid?id='+this.state.class_id)
        .then(res => {
            console.log(res)
            this.setState({class: res.data[0]})
        })
        .catch(err => console.log(err))

        console.log('ko')
        
    }


    
    studentFormatter(cell, row){
        if(row['first_name'] == null){
            return "None"
        }
        return row['first_name']+' '+row['last_name']
    }

    onAfterSaveCell(row,  cellName, cellValue){
        console.log(row)
        let sel = this.state.selected;
        sel.push(row)
        console.log(sel)
        this.setState({
            selected: sel
        })
    }

    onBeforeSaveCell(row, cellName, cellValue) {
        console.log(cellName)
        if(cellName === 'count')
        {
            console.log(cellName)
            return false;
        }
        else{
            let sel = this.state.selected;
            if(sel.includes(row)){
                sel.pop(row)
                this.setState({
                    selected: sel
                })
            }
            return true;
        }
      }
    
    render(){
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell, 
            afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
          };
        
         
        return(
            <div>
                <div>
            <HeaderTeacher updateParent={this.updateValue} />
             <div>   
             <div style={{backgroundColor:"orange", marginTop:"150px",height:"500px", opacity:"0.65"}}> 
             <Row className="page-title">
          
                <Col style={{margin:"10px"}} sm={6} lg={4} >
                    <Breadcrumb className="float-left float-sm-left">
                    <BreadcrumbItem >Teachers</BreadcrumbItem>
                    <BreadcrumbItem >Classes</BreadcrumbItem>
                    <BreadcrumbItem >{this.state.class['class_name']}</BreadcrumbItem>
                    <BreadcrumbItem active>Attendance</BreadcrumbItem>
                    
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
                                                
                                                    <h2 style={{fontSize:"18px", fontWeight:"bolder", marginBottom:"30px"}} className="name">Class Info</h2>
                                                    <p>School Term: <span style={{fontSize:"100%", fontWeight:"bolder", marginRight:"50%"}} className="float-right">{ this.state.class['class_name']}  </span></p>
                                                    <p>Class Name: <span style={{fontSize:"100%", fontWeight:"bolder", marginRight:"50%"}} className="float-right">{ this.state.class['term']     } </span> </p>
                                                    
                                                </div>
                                            </Col>
                                           
                                        </Row>
                                        
                                    </div>
                                </div>
                            </CardBody>
                        </div>
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                    <div style={{margin:"10px"}}>
                    <Button onClick={this.save} style={{marginBottom:"4px", width:"70%", textAlign: "left", backgroundColor:"grey"}} type="button" className="btn btn-sm"><i style={{marginRight:"10px"}} className="fa fa-id-card-o"></i>Save Changes</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title
                            </ModalHeader>
                            <ModalBody>
                                <p>Please wait. Your request is getting processed.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>OK</Button>
                                
                            </ModalFooter>
                        </Modal>
                    </div>
                    </Col>
                </Row>
                
                <Row style={{height:"200px"}}>
                    <Col xl={12} className="mb-30">
                    <Card style={{margin: "10px"}}>
                        <CardBody>
                        <BootstrapTable
                                data={this.state.grade}
                                tableStyle={{height:"150px"}}
                                pagination
                                cellEdit={ cellEditProp }
                                >
                                <TableHeaderColumn width='100' dataField='first_name' dataFormat={this.studentFormatter} isKey={true}>Name</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='student_id'>Student ID</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='one'>1</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='two'>2</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='three'>3</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='four'>4</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='five'>5</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='six'>6</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='seven'>7</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='eight'>8</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='nine'>9</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='ten'>10</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='count'>#</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='notes'>Notes</TableHeaderColumn>
                            </BootstrapTable>
                        </CardBody>
                    </Card>
                </Col>
                </Row>

            </div>
            </div>
            </div>
            </div>
        )
    }
}