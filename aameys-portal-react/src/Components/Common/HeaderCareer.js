// import React,{Component} from 'react';
// import { Link } from 'react-router-dom';

// export default class Header extends Component
// {
//     constructor(props){
        
//         super(props);
//     }
//     render(){
//         return(
//             <nav className="admin-header navbar navbar-default col-lg-12 col-12 p-0 fixed-top d-flex flex-row"> 
//                 <div className="text-left navbar-brand-wrapper">
//                     <Link className="navbar-brand brand-logo" to="/"><img src="assets/images/logo-dark.png" alt="" /></Link>
//                     <Link className="navbar-brand brand-logo-mini" to="/"><img src="assets/images/logo-icon-dark.png"  alt="" /></Link>
//                 </div>
//             </nav>
//         );
//     }
// }



import React,{Component} from 'react';
import { Link, matchPath } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './header.css';




class HeaderCareer extends Component{

    constructor(props) {
        super(props);
      
        this.state = {
          toggleactive: false,
          defaultValue: 1,
          student_id:"",
          admin_id:"",
          teacher_id:"",
          parent_id:""
        };
        console.log(process.env.PUBLIC_URL);
        console.log(process.env.NODE_ENV);
      }
      

      componentDidUpdate(){
        console.log(this.props)
      }
      
      componentDidMount(){
        console.log(this.props)
      }
    render(){
        return(
            <div style={{marginBottom:"90px"}}>
              <nav className="admin-header navbar navbar-default col-lg-12 col-12 p-0 fixed-top d-flex flex-row"> 

                    <Col sm={2} md={4} lg={4}>
                    <div className="text-left navbar-brand-wrapper">
                      <Link className="navbar-brand brand-logo" to="/"><img style={{height:"60px"}} src="src/Aameys-assets/ameys-logo.png" alt="" /></Link>
                      <Link className="navbar-brand brand-logo-mini" to="/"><img src="Aameys-assets/ameys-logo.png"  alt="" /></Link>
                    </div>
                    </Col>
                   
                    <Col className="" md={8} lg={8} sm={2}>
             
                    {/* <!-- top bar right --> */}
                    <ul className="nav navbar-nav ml-auto col-lg-12 col-12">
                    {/* <Row className="col-lg-12 col-12" md={12} lg={12} sm={12}> */}
                    <div className=""></div>
                    
                        <Col style={{textAlign:"center"}} sm={2} md={2} lg={2}>
                          <p>About Us</p>
                        </Col>
                    <Col style={{textAlign:"center"}} sm={2} md={2} lg={1}>
                          <p>Home</p>
                        </Col>
                        
                        <Col  style={{textAlign:"right"}} sm={2} md={2} lg={2}>
                          <p>TEACHERS</p>
                        </Col>
                        <Link className={`${this.state.student_id != ""? 'active' : ''}`} to={{pathname:  `/student/${this.state.user_id}`}}><Col sm={2} md={2} lg={2}>
                          <p >STUDENTS</p>
                        </Col></Link>
                        <Col  sm={2} md={2} lg={2}>
                          <Link to={{pathname:"parent/signup"}}><p>PARENTS</p></Link>
                        </Col>
                        <Col className="active" sm={2} md={2} lg={2}>
                          <p className="active">CAREERS</p>
                        </Col>
                        {/* <Col sm={2}>
                          <a href="#" >New registered user  </a>
                        </Col> */}
                        {/* </Row> */}
                    </ul>
                    </Col>

                </nav>
                </div>
            //   End Header

        );
    }
}
export default HeaderCareer;

