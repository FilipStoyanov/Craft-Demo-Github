import { base64EncodeFreshDeskKey } from "../helpers";
import { Contact } from "../interfaces";
const fetch = require('node-fetch');
export const fetchUserFromGithub = async (username: string, token: string | undefined = process.env.GITHUB_TOKEN) => {
    let response;
    if (username.length > 0) {
        response = await fetch(`https://api.github.com/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
            }
        });
    }
    const result = response ? response.json() : null;
    return result;
}

export const fetchUserFromFreshDesk = async (subdomain: string,  token: string | undefined = process.env.FRESHDESK_TOKEN ) => {
    let response;
    const encodedFreshDeskToken = base64EncodeFreshDeskKey(token);
    if (subdomain.length > 0) {
        try {
            response = await fetch(`https://${subdomain}.freshdesk.com/api/v2/contacts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${encodedFreshDeskToken}`,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const result = response ? response.json() : null;
    return result;
}

export const updateContactFromFreshDesk = async (newContact: Contact, subdomain: string, id?: number, token: string | undefined = process.env.FRESHDESK_TOKEN ) => {
    let response;
    const encodedFreshDeskToken = base64EncodeFreshDeskKey(token);
    try {
        response = await fetch(`https://${subdomain}.freshdesk.com/api/v2/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${encodedFreshDeskToken}`,
            },
            body: JSON.stringify(newContact)
        });
    } catch (error) {
        console.log(error);
    }
    const result = response ? response.json() : null;
    return result;
}

export const addNewContact = async (newContact: Contact, subdomain: string,  token: string | undefined = process.env.FRESHDESK_TOKEN) => {
    let response;
    const encodedFreshDeskToken = base64EncodeFreshDeskKey(token);
    try {
        response = await fetch(`https://${subdomain}.freshdesk.com/api/v2/contacts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${encodedFreshDeskToken}`,
            },
            body: JSON.stringify(newContact)
        });
    } catch (error) {
        console.log(error);
    }
    const result = response ? response.json() : null;
    return result;
}