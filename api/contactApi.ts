import { baseApi } from "./baseApi";

export interface CreateContactRequest {
	name: string;
	email?: string;
	phone: string;
	message: string;
}

export interface ContactResponseData {
	id: string;
	name: string;
	email?: string;
	phone: string;
	message: string;
	createdAt: string;
}

export interface CreateContactResponse {
	success: boolean;
	message: string;
	meta: any;
	data: ContactResponseData;
}

export const contactApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createContact: builder.mutation<CreateContactResponse, CreateContactRequest>({
			query: (body) => ({
				url: "/system/contact",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useCreateContactMutation } = contactApi;
