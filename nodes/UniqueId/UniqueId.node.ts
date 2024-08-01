import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

// let counter = 0;
// let currentDateStr = '';

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

	static counter = 0;
	static currentDateStr = '';

	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const dateStr = `${year}${month}${day}${hours}${minutes}`;
		if (dateStr !== UniqueId.currentDateStr) {
			UniqueId.currentDateStr = dateStr;
			UniqueId.counter = 0;
		}
		const counterStr = String(UniqueId.counter).padStart(4, '0');

		const str = `${dateStr}${counterStr}`;
		UniqueId.counter += 1;
		if (UniqueId.counter > 9999) {
			UniqueId.counter = 0;
		}
		return this.prepareOutputData([{ json: {
			identity: str
		}}]);
	}
}

