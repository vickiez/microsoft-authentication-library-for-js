import { LogLevel } from "@azure/msal-browser";

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
 export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_SISOPolicy",
        editProfile: "B2C_1_ProfileEditPolicy"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://msidlabb2c.b2clogin.com/msidlabb2c.onmicrosoft.com/B2C_1_SISOPolicy"
        },
        editProfile: {
            authority: "https://msidlabb2c.b2clogin.com/msidlabb2c.onmicrosoft.com/B2C_1_ProfileEditPolicy"
        }
    },
    authorityDomain: "msidlabb2c.b2clogin.com"
}

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "e3b9ad76-9763-4827-b088-80c7a7888f79",
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    },
    system: {
        allowNativeBroker: false, // Disables WAM Broker
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
    scopes: ["https://msidlabb2c.onmicrosoft.com/msidlabb2capi/read"]
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig = {
    scopes: ['https://msidlabb2c.onmicrosoft.com/msidlabb2capi/read'],
    uri: 'https://msidlabb2c.onmicrosoft.com/msidlabb2capi'
};
