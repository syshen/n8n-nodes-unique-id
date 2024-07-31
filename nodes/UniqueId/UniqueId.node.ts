import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

let counter = 0;
let currentDateStr = '';

export class UniqueId implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Unique Identity Generator',
		name: 'uniqueId',
		icon: 'file:UniqueId.svg',
		group: ['transform'],
		version: 1,
		description: 'Generate an unique identity string',
		defaults: {
			name: 'Unique Identity',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
		],
	};

	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const dateStr = `${year}${month}${day}${hours}${minutes}`;
		if (dateStr !== currentDateStr) {
			currentDateStr = dateStr;
			counter = 0;
		}
		const counterStr = String(counter).padStart(4, '0');

		const str = `${dateStr}${counterStr}`;
		counter ++;
		if (counter > 9999) {
			counter = 0;
		}
		return this.prepareOutputData([{ json: {
			identity: str
		}}]);
	}
}

