
import React, {Component} from 'react';
import {Input, Button, Header,Form,Checkbox, Container} from 'semantic-ui-react';
import {Formik} from 'formik';

export default class PredictionForm extends Component{

    constructor(props){
      super(props);
      this.state = {
        winProbability: null
      }
    }
    render(){


        return(
          <div style={{marginTop:'10%'}}>
          <Container style={{backgroundColor:"white", borderRadius:"25px",boxShadow: "2px 2px 5px #fc6767", padding:"10px"}}>
          <Header as="h1">Hackathon Predictor</Header>
          <Formik 
          initialValues={{
          Title:"PLEASE PUT IN TITLE", 
          ShortPitch:"Please Enter ShortPitch",
          Description:"PLEASE PUT IN DESCRIPTION", 
          }} 
          onSubmit={(values) => {
            console.log(values);
      }}
      render={props => (
        <div style={{ padding:"10px"
        }}>
        <Form onSubmit={props.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Title' placeholder='Title' 
            
            onChange={props.handleChange} name="Title" values={props.values.Title}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Short Pitch' placeholder='Short Pitch' 
            onChange={props.handleChange} name="ShortPitch" values={props.values.ShortPitch}/>
          </Form.Group>
          <Form.TextArea label='Description' placeholder='Tell us more about you...' 
            onChange={props.handleChange} name="Description" values={props.values.Description}/>
          <Form.Button color="blue" type="submit" >Submit</Form.Button>
        </Form>
        </div>
      )}
    />
          {this.state.winProbability != null ? <Header as="h3">Your winning Probability is {this.state.winProbability}</Header> :
        <span></span>}
        </Container>
        </div>
        );
    }
  
}