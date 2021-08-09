/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { CommonEndSessionRequest } from "@azure/msal-common";
import { PopupConfiguration } from "../utils/PopupUtils";

/**
 * EndSessionPopupRequest
 * - account                - Account object that will be logged out of. All tokens tied to this account will be cleared.
 * - postLogoutRedirectUri  - URI to navigate to after logout page inside the popup. Required to ensure popup can be closed.
 * - authority              - Authority to send logout request to.
 * - correlationId          - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
 * - idTokenHint            - ID Token used by B2C to validate logout if required by the policy
 * - mainWindowRedirectUri  - URI to navigate the main window to after logout is complete
 */
export type EndSessionPopupRequest = Partial<CommonEndSessionRequest> & {
    authority?: string;
    mainWindowRedirectUri?: string;
    popupConfiguration?: PopupConfiguration;
};
