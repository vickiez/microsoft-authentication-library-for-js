/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { testAccount, TEST_CONFIG } from "../TestConstants";
import { MsalProvider } from "../../src/MsalProvider";
import { UnauthenticatedTemplate } from "../../src/components/UnauthenticatedTemplate";
import { PublicClientApplication, IPublicClientApplication, Configuration } from "@azure/msal-browser";

describe("MsalProvider tests", () => {
    let pca: IPublicClientApplication;
    const msalConfig: Configuration = {
        auth: {
            clientId: TEST_CONFIG.MSAL_CLIENT_ID
        }
    };

    beforeEach(() => {
        pca = new PublicClientApplication(msalConfig);
    });

    afterEach(() => {
    // cleanup on exiting
        jest.clearAllMocks();
    });

    test("UnauthenticatedComponent does not show child component if an account is signed in", async () => {        
        const handleRedirectSpy = jest.spyOn(pca, "handleRedirectPromise");
        const getAllAccountsSpy = jest.spyOn(pca, "getAllAccounts");
        getAllAccountsSpy.mockImplementation(() => [testAccount]);
        render(
            <MsalProvider instance={pca}>
                <p>This text will always display.</p>
                <UnauthenticatedTemplate>
                    <span>No user is authenticated!</span>
                </UnauthenticatedTemplate>
            </MsalProvider>
        );

        await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1));
        expect(screen.queryByText("This text will always display.")).toBeInTheDocument();
        expect(screen.queryByText("No user is authenticated!")).not.toBeInTheDocument();
    });

    test("UnauthenticatedComponent shows child component if no account is signed in", async () => {        
        const handleRedirectSpy = jest.spyOn(pca, "handleRedirectPromise");
        render(
            <MsalProvider instance={pca}>
                <p>This text will always display.</p>
                <UnauthenticatedTemplate>
                    <span>No user is authenticated!</span>
                </UnauthenticatedTemplate>
            </MsalProvider>
        );

        await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1));
        expect(screen.queryByText("This text will always display.")).toBeInTheDocument();
        expect(screen.queryByText("No user is authenticated!")).toBeInTheDocument();
    });

    test("UnauthenticatedComponent does not show child component if specific username is signed in", async () => {        
        const handleRedirectSpy = jest.spyOn(pca, "handleRedirectPromise");
        const getAllAccountsSpy = jest.spyOn(pca, "getAllAccounts");
        getAllAccountsSpy.mockImplementation(() => [testAccount]);
        render(
            <MsalProvider instance={pca}>
                <p>This text will always display.</p>
                <UnauthenticatedTemplate username={testAccount.username}>
                    <span>This user is not authenticated!</span>
                </UnauthenticatedTemplate>
            </MsalProvider>
        );

        await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1));
        expect(screen.queryByText("This text will always display.")).toBeInTheDocument();
        expect(screen.queryByText("This user is not authenticated!")).not.toBeInTheDocument();
    });

    test("UnauthenticatedComponent does not show child component if specific homeAccountId is signed in", async () => {        
        const handleRedirectSpy = jest.spyOn(pca, "handleRedirectPromise");
        const getAllAccountsSpy = jest.spyOn(pca, "getAllAccounts");
        getAllAccountsSpy.mockImplementation(() => [testAccount]);
        render(
            <MsalProvider instance={pca}>
                <p>This text will always display.</p>
                <UnauthenticatedTemplate homeAccountId={testAccount.homeAccountId}>
                    <span>This user is authenticated!</span>
                </UnauthenticatedTemplate>
            </MsalProvider>
        );

        await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1));
        expect(screen.queryByText("This text will always display.")).toBeInTheDocument();
        expect(screen.queryByText("This user is not authenticated!")).not.toBeInTheDocument();
    });

    test("UnauthenticatedComponent shows child component if specific username is not signed in", async () => {        
        const handleRedirectSpy = jest.spyOn(pca, "handleRedirectPromise");
        const getAllAccountsSpy = jest.spyOn(pca, "getAllAccounts");
        getAllAccountsSpy.mockImplementation(() => [testAccount]);
        render(
            <MsalProvider instance={pca}>
                <p>This text will always display.</p>
                <UnauthenticatedTemplate username={"test@example.com"}>
                    <span>This user is not authenticated!</span>
                </UnauthenticatedTemplate>
            </MsalProvider>
        );

        await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1));
        expect(screen.queryByText("This text will always display.")).toBeInTheDocument();
        expect(screen.queryByText("This user is not authenticated!")).toBeInTheDocument();
    });

    test("UnauthenticatedComponent shows child component if specific homeAccountId is not signed in", async () => {        
        const handleRedirectSpy = jest.spyOn(pca, "handleRedirectPromise");
        const getAllAccountsSpy = jest.spyOn(pca, "getAllAccounts");
        getAllAccountsSpy.mockImplementation(() => [testAccount]);
        render(
            <MsalProvider instance={pca}>
                <p>This text will always display.</p>
                <UnauthenticatedTemplate homeAccountId={"homeAccountId_does_not_exist"}>
                    <span>This user is not authenticated!</span>
                </UnauthenticatedTemplate>
            </MsalProvider>
        );

        await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1));
        expect(screen.queryByText("This text will always display.")).toBeInTheDocument();
        expect(screen.queryByText("This user is not authenticated!")).toBeInTheDocument();
    });
});
