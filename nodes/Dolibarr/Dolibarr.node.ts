import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Dolibarr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dolibarr',
		name: 'dolibarr',
		icon: 'file:dolibarr.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Dolibarr API',
		defaults: {
			name: 'Dolibarr',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'dolibarrApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.url}}/api/index.php',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Third Party',
						value: 'thirdparty',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
				],
				default: 'product',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'product',
							'thirdparty',
							'invoice',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a record',
						action: 'Create a record',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a record',
						action: 'Get a record',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all records',
						action: 'Get all records',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a record',
						action: 'Update a record',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a record',
						action: 'Delete a record',
					},
				],
				default: 'getAll',
			},
			// ID Field (for operations that need it)
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
							'update',
							'delete',
						],
						resource: [
							'product',
							'thirdparty',
							'invoice',
						],
					},
				},
			},
			// Fields for Product
			{
				displayName: 'Product Fields',
				name: 'productFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'create',
							'update',
						],
						resource: [
							'product',
						],
					},
				},
				options: [
					{
						displayName: 'Reference',
						name: 'ref',
						type: 'string',
						default: '',
						description: 'Product reference',
					},
					{
						displayName: 'Label',
						name: 'label',
						type: 'string',
						default: '',
						description: 'Product label',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Product description',
					},
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						default: 0,
						description: 'Product price',
					},
				],
			},
			// Fields for Third Party
			{
				displayName: 'Third Party Fields',
				name: 'thirdpartyFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'create',
							'update',
						],
						resource: [
							'thirdparty',
						],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the third party',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Email of the third party',
					},
					{
						displayName: 'Address',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Address of the third party',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Phone number of the third party',
					},
				],
			},
			// Fields for Invoice
			{
				displayName: 'Invoice Fields',
				name: 'invoiceFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'create',
							'update',
						],
						resource: [
							'invoice',
						],
					},
				},
				options: [
					{
						displayName: 'Third Party ID',
						name: 'socid',
						type: 'string',
						default: '',
						description: 'ID of the third party',
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
						description: 'Date of the invoice',
					},
					{
						displayName: 'Payment Terms',
						name: 'cond_reglement_id',
						type: 'string',
						default: '',
						description: 'Payment terms ID',
					},
				],
			},
		],
	};
} 