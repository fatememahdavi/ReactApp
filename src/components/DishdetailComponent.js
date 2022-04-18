import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class DishDetail  extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

    toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
    }

    handleSubmit(values) {
        //console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dish.id, values.rating, values.yname, values.comment);

    }

    render() {
        const dish = this.props.dish;
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (dish != null){
            const dishComments = this.props.comments.map((dishCom) => {
            return (
                <Fade in>
                    <li key={dishCom.id}>
                    <p>{dishCom.comment}</p>
                    <p>-- {dishCom.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dishCom.date)))}</p>
                    </li>
                </Fade>
                );
            });
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <FadeTransform in
                                    transformProps={{
                                        exitTransform: 'scale(0.5) translateY(-50%)'
                                    }}>
                                <Card>
                                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                                    <CardBody>
                                        <CardTitle>{dish.name}</CardTitle>
                                        <CardText>{dish.description}</CardText>
                                    </CardBody>
                                </Card>
                            </FadeTransform>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <Stagger in>
                                {dishComments}
                            </Stagger>
                            {this.props.postComment}
                            <Button outline onClick={this.toggleModal}><span className="fa fa-submit fa-lg"></span>  Submit Comment</Button>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Label htmlFor="rating" md={2}>Rating</Label><br></br>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Label htmlFor="yname" md={5}>Your Name</Label><br></br>
                                        <Control.text model=".yname" id="yname" name="yname"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(2), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".yname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    
                                    <Col md={10}>
                                        <Label htmlFor="comment" md={2}>Comment</Label><br></br>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10, offset: 0}}>
                                        <br></br>
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>

            );
        }
            
        else
            return(
                <div></div>
            );
    }
}
export default DishDetail;