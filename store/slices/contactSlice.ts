import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
	id: string;
	name: string;
	email?: string;
	phone: string;
	message: string;
	createdAt: string;
}

export interface ContactState {
	contacts: Contact[];
	loading: boolean;
	error: string | null;
}

const initialState: ContactState = {
	contacts: [],
	loading: false,
	error: null,
};

const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {
		setContacts: (state, action: PayloadAction<Contact[]>) => {
			state.contacts = action.payload;
			state.loading = false;
			state.error = null;
		},
		addContact: (state, action: PayloadAction<Contact>) => {
			state.contacts.push(action.payload);
			state.loading = false;
			state.error = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
			state.loading = false;
		},
		clearContacts: (state) => {
			state.contacts = [];
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	setContacts,
	addContact,
	setLoading,
	setError,
	clearContacts,
} = contactSlice.actions;
export default contactSlice.reducer;
