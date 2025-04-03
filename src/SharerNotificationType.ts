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

export enum SharerNotificationSeverity {
    UNCLASSIFIED = 'UNCLASSIFIED',
    NORMAL = 'NORMAL',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}


//interface for notification types
export interface SharerNotificationType {
    getDefaultSeverity(): SharerNotificationSeverity;
    name(): StandardNotificationType;
}


//standard notification types used in the DeRec system
export enum StandardNotificationType {
    UPDATE_PROGRESS = 'UPDATE_PROGRESS',
    UPDATE_AVAILABLE = 'UPDATE_AVAILABLE',
    UPDATE_FAILED = 'UPDATE_FAILED',
    UPDATE_COMPLETE = 'UPDATE_COMPLETE',
    VERIFY_PROGRESS = 'VERIFY_PROGRESS',
    VERIFY_AVAILABLE = 'VERIFY_AVAILABLE',
    VERIFY_FAILED = 'VERIFY_FAILED',
    VERIFY_COMPLETE = 'VERIFY_COMPLETE',
    RECOVERY_PROGRESS = 'RECOVERY_PROGRESS',
    RECOVERY_AVAILABLE = 'RECOVERY_AVAILABLE',
    RECOVERY_FAILED = 'RECOVERY_FAILED',
    RECOVERY_COMPLETE = 'RECOVERY_COMPLETE',
    RECOVERY_SECRET_SHARE_DISCOVERED = 'RECOVERY_SECRET_SHARE_DISCOVERED',
    LIST_SECRET_PROGRESS = 'LIST_SECRET_PROGRESS',
    LIST_SECRET_AVAILABLE = 'LIST_SECRET_AVAILABLE',
    LIST_SECRET_FAILED = 'LIST_SECRET_FAILED',
    HELPER_PAIRED = 'HELPER_PAIRED',
    HELPER_NOT_PAIRED = 'HELPER_NOT_PAIRED',
    HELPER_UNHEALTHY = 'HELPER_UNHEALTHY',
    HELPER_HEALTHY = 'HELPER_HEALTHY',
    HELPER_UNPAIRED = 'HELPER_UNPAIRED',
    SECRET_UNAVAILABLE = 'SECRET_UNAVAILABLE',
    SECRET_AVAILABLE = 'SECRET_AVAILABLE'
}


//map of default severities for each standard notification type
export const standardNotificationSeverities: Record<StandardNotificationType, SharerNotificationSeverity> = {
    [StandardNotificationType.UPDATE_PROGRESS]: SharerNotificationSeverity.UNCLASSIFIED,
    [StandardNotificationType.UPDATE_AVAILABLE]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.UPDATE_FAILED]: SharerNotificationSeverity.ERROR,
    [StandardNotificationType.UPDATE_COMPLETE]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.VERIFY_PROGRESS]: SharerNotificationSeverity.UNCLASSIFIED,
    [StandardNotificationType.VERIFY_AVAILABLE]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.VERIFY_FAILED]: SharerNotificationSeverity.ERROR,
    [StandardNotificationType.VERIFY_COMPLETE]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.RECOVERY_PROGRESS]: SharerNotificationSeverity.UNCLASSIFIED,
    [StandardNotificationType.RECOVERY_AVAILABLE]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.RECOVERY_FAILED]: SharerNotificationSeverity.ERROR,
    [StandardNotificationType.RECOVERY_COMPLETE]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.RECOVERY_SECRET_SHARE_DISCOVERED]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.LIST_SECRET_PROGRESS]: SharerNotificationSeverity.UNCLASSIFIED,
    [StandardNotificationType.LIST_SECRET_AVAILABLE]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.LIST_SECRET_FAILED]: SharerNotificationSeverity.ERROR,
    [StandardNotificationType.HELPER_PAIRED]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.HELPER_NOT_PAIRED]: SharerNotificationSeverity.ERROR,
    [StandardNotificationType.HELPER_UNHEALTHY]: SharerNotificationSeverity.WARNING,
    [StandardNotificationType.HELPER_HEALTHY]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.HELPER_UNPAIRED]: SharerNotificationSeverity.NORMAL,
    [StandardNotificationType.SECRET_UNAVAILABLE]: SharerNotificationSeverity.ERROR,
    [StandardNotificationType.SECRET_AVAILABLE]: SharerNotificationSeverity.NORMAL
};

