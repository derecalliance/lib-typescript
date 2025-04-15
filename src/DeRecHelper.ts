/*
 * Copyright (c) DeRec Alliance and its Contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// returns the list of all shares (DeRecShare objects) known to the helper
// filters the shares based on the sharerStatus and extracts the secretId for each share
// returns an array of SecretId corresponding to the provided sharerStatus

import { NotificationResponse } from './NotificationResponse.js';
import { SecretId } from './SecretId.js';
import { DeRecSharerStatus } from './DeRecSharerStatus.js';
import { DeRecHelperNotification } from './DeRecHelperNotification.js';
import { DeRecShare } from './DeRecShare.js';

export class DeRecHelper {
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