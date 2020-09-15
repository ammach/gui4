import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Form, Button } from 'antd';
import { Form as ConfiguredForm } from '@components/form/Form';
import { FormItemWithTwoInputs } from '@components/form/formItemWithTwoInputs/FormItemWithTwoInputs';
import './stories.css';

export default { title: 'FormItemWithTwoInputs', decorators: [withKnobs] };

const onFinish = (values) => {
	console.log('success', values);
};

export const formItemWithTwoInputs = () => {
	const [form] = Form.useForm();

	const label = 'incomingChoice';
	const options = {
		Essence: 'gasoline',
		Électricité: 'electric',
	};
	const defaultValue = 'gasoline';
	const groupId = 'GROUP-ID1';
	const incomingChoice = select(label, options, defaultValue, groupId);

	const questions = [
		{
			choice: 'gasoline',
			response: {
				name: 'litre',
				label: 'L/100 km',
			},
		},
		{
			choice: 'electric',
			response: {
				name: 'kilowatt',
				label: 'kWh/100 km',
			},
		},
	];

	return (
		<ConfiguredForm
			form={form}
			onFinish={onFinish}
			onFinishFailed={() => console.log('failed')}
		>
			<FormItemWithTwoInputs
				form={form}
				label="Consommation moyenne aux 100 km (si connue)"
				tooltipTitle="Consommation moyenne aux 100 km"
				incomingChoice={incomingChoice}
				questions={questions}
			/>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Click here to see the error state
				</Button>
			</Form.Item>
		</ConfiguredForm>
	);
};
