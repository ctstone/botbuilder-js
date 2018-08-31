/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { IBlobStorageService, ServiceTypes } from '../schema';
import { AzureService } from './azureService';

export class BlobStorageService extends AzureService implements IBlobStorageService {
    public connectionString: string = '';
    public container: string = '';

    constructor(source: IBlobStorageService = {} as IBlobStorageService) {
        super(source, ServiceTypes.BlobStorage);
        const { connectionString = '', container = '' } = source;
        Object.assign(this, { connectionString, container });
    }

    public toJSON(): IBlobStorageService {
        const { type, id, name, tenantId, subscriptionId, resourceGroup, serviceName, connectionString, container } = this;

        return { type, id, name, tenantId, subscriptionId, resourceGroup, serviceName, connectionString, container };
    }

    // encrypt keys in service
    public encrypt(secret: string, encryptString: (value: string, secret: string) => string): void {
        if (this.connectionString && this.connectionString.length > 0) {
            this.connectionString = encryptString(this.connectionString, secret);
        }
    }

    // decrypt keys in service
    public decrypt(secret: string, decryptString: (value: string, secret: string) => string): void {
        if (this.connectionString && this.connectionString.length > 0) {
            this.connectionString = decryptString(this.connectionString, secret);
        }
    }
}
