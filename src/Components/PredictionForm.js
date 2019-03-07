/* eslint-disable no-unused-expressions */

import React, {Component} from 'react';
import {Input, Button, Header,Form,Checkbox, Container} from 'semantic-ui-react';
import SubmitModal from './SubmitModal';
import {Formik} from 'formik';
import axios from 'axios';
<<<<<<< HEAD
import 'semantic-ui-css/semantic.min.css';

=======
>>>>>>> 5ea911747399d8eda8f1a0da67bd0a9e48090d2c
export default class PredictionForm extends Component{

    constructor(props){
      super(props);
      this.state = {
		winProbability: null,
		openModal: false
      }
	}
    render(){


        return (
        <div style={{marginTop:'10%'}}>
          	<Container style={{backgroundColor:"white", borderRadius:"25px",boxShadow: "2px 2px 5px #fc6767", padding:"10px"}}>
				<Header as="h1">Hackathon Predictor</Header>
				<Formik
					initialValues={{
						Title: "", 
						ShortPitch: "",
						Description: "", 
						Tags: "",
					}}
					onSubmit={async (values) => {
						let submission = {
							...values,
							Tags: values.Tags.split(",").map(tag => tag.toLowerCase().trim())
						};
<<<<<<< HEAD
						console.log('submitted');
						console.log(submission);
						axios.post('/prediction', submission)
						.then((res) => {
							console.log('received');
							this.setState((state, props) => {
								return {openModal: true, winProbability: res.percent};
							});
						})
						.catch((err) => {
							console.log(err);
						})
=======
						try{
							let res = await axios.post('/prediction',submission);
							console.log(submission);
							console.log(res);
						}catch(e){
							console.log(e)
						}
						
>>>>>>> 5ea911747399d8eda8f1a0da67bd0a9e48090d2c
					}}
					render={props => (
						<div style={{ padding:"10px"}}>
							<Form onSubmit={props.handleSubmit}>
								<Form.Group widths='equal'>
									<Form.Input
										fluid label='Title'
										placeholder='Title' 
										onChange={props.handleChange}
										name="Title"
										values={props.values.Title}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input
										fluid label='Short Pitch' 
										placeholder='Short pitch' 
										onChange={props.handleChange}
										name="ShortPitch"
										values={props.values.ShortPitch}
									/>
								</Form.Group>
								<Form.TextArea
									label='Description'
									placeholder='Tell us more about your project...' 
									onChange={props.handleChange}
									name="Description"
									values={props.values.Description}
								/>
								<Form.Group widths='equal'>
									<Form.Input
										fluid label='Tags' 
										placeholder='NodeJS, React, Express...' 
										onChange={props.handleChange}
										name="Tags"
										values={props.values.Tags}
									/>
								</Form.Group>
								<Form.Button color="blue" type="submit" >Submit</Form.Button>
							</Form>
						</div>
					)}
				/>
          		<SubmitModal
					open={this.state.openModal}
					winProbability={this.state.winProbability}
					closer={() => this.setState((state, props) => {
						return {openModal: false}
					})}
				>
				</SubmitModal>
        	</Container>
        </div>
        );
    }
  
}