
import React, {Component} from 'react';
import {Input, Button, Header,Form,Checkbox} from 'semantic-ui-react';

export default class PredictionForm extends Component{

    render(){
        return(
            <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
        );
    }
  
}