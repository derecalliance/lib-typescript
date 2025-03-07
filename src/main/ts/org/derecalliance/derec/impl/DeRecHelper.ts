// returns the list of all shares (DeRecShare objects) known to the helper
// filters the shares based on the sharerStatus and extracts the secretId for each share
// returns an array of SecretId corresponding to the provided sharerStatus

import { NotificationResponse } from './NotificationResponse';
import { SecretId } from './DeRecSecret';
import { DeRecSharerStatus } from './DeRecSharerStatus';
import { DeRecHelperNotification } from './DeRecHelperNotification';
import { DeRecShare } from './DeRecShare';

export class DeRecHelperImpl implements DeRecHelper {
    private shares: DeRecShare[] = [];
    private sharers: DeRecSharerStatus[] = [];
    private listener?: (notification: DeRecHelperNotification) => NotificationResponse;
    
    getShares(): DeRecShare[] {
        return this.shares;
    }

    getVersionNumbersForASecret(secretId: SecretId): number[] {
        const share = this.shares.find(share => share.secretId === secretId);
        return share ? share.versionNumbers : [];
    }

    getSecretIds(sharerStatus: DeRecSharerStatus): SecretId[] {
        return this.shares
            .filter(share => share.sharerStatus === sharerStatus)
            .map(share => share.secretId);
    }

    getSharers(): DeRecSharerStatus[] {
        return this.sharers;
    }

    removeSharer(sharerStatus: DeRecSharerStatus): void {
        this.shares = this.shares.filter(share => share.sharerStatus !== sharerStatus);
        this.sharers = this.sharers.filter(sharer => sharer !== sharerStatus);
    }

    setListener(listener: (notification: DeRecHelperNotification) => NotificationResponse): void {
        this.listener = listener;
    }
}