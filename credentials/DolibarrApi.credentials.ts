import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DolibarrApi implements ICredentialType {
	name = 'dolibarrApi';
	displayName = 'Dolibarr API';
	documentationUrl = 'https://wiki.dolibarr.org/index.php/Module_Web_Services_API_REST';
	properties: INodeProperties[] = [
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			default: 'https://10.10.0.5:6060',
			placeholder: 'https://10.10.0.5:6060',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'DOLAPIKEY': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url}}/api/index.php',
			url: '/status',
			method: 'GET',
		},
	};
} 