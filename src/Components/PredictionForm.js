
import React, {Component} from 'react';
import {Input, Button, Header,Form,Checkbox, Container} from 'semantic-ui-react';
import {Formik} from 'formik';
import axios from 'axios';
export default class PredictionForm extends Component{

    constructor(props){
      super(props);
      this.state = {
        winProbability: null
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
							Tags: values.Tags.split(",").map(tag => tag.trim())
						};
						try{
							let res = await axios.post('/prediction',submission);
							console.log(submission);
							console.log(res);
						}catch(e){
							console.log(e)
						}
						
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
										placeholder='Short Pitch' 
										onChange={props.handleChange}
										name="ShortPitch"
										values={props.values.ShortPitch}
									/>
								</Form.Group>
								<Form.TextArea
									label='Description'
									placeholder='Tell us more about you...' 
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
          		{
					(() => {
						if (this.state.winProbability)
							return (<Header as="h3">Your winning Probability is {this.state.winProbability}</Header>);
						else
							return (<span></span>);
					})()
				}
        	</Container>
        </div>
        );
    }
  
}