import React from 'react';
import {Modal, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const BASE_ADV = 0.07;

const advantage = (percent) => {
	let advStr = "";
	advStr += Number(percent / BASE_ADV).toFixed(2);
	advStr += "x";
	return advStr;
}

class SubmitModal extends React.PureComponent {
	render() {
		return (
			<Modal open={this.props.open}>
				<Modal.Content>
					<Modal.Description>
						<p>Your advantage is: {advantage(this.props.winProbability)}</p>
					</Modal.Description>
					<Button color='green' style={{marginLeft: '90%'}}onClick={this.props.closer}>Done</Button>
				</Modal.Content>
			</Modal>
		);
	}
}

export default SubmitModal;