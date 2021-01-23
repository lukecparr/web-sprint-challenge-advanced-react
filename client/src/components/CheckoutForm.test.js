import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
	render(<CheckoutForm />);

	expect(screen.getByText(/checkout form/i)).toBeInTheDocument();

});

test("form shows success message on submit with form details", () => {
	render(<CheckoutForm />);

	// Select form fields in variables
	const fName = screen.getByLabelText(/first name/i)
	const lName = screen.getByLabelText(/last name/i)
	const address = screen.getByLabelText(/address/i)
	const city = screen.getByLabelText(/city/i)
	const state = screen.getByLabelText(/state/i)
	const zip = screen.getByLabelText(/zip/i)
	const submitButton = screen.getByRole("button")

	//Assert that form fields should exist
	expect(fName).toBeInTheDocument();
	expect(lName).toBeInTheDocument();
	expect(address).toBeInTheDocument();
	expect(city).toBeInTheDocument();
	expect(state).toBeInTheDocument();
	expect(zip).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();

	//Type into form fields
	userEvent.type(fName, "Luke");
	userEvent.type(lName, "Parr");
	userEvent.type(address, "1 Fake st");
	userEvent.type(city, "BigTown");
	userEvent.type(state, "NV");
	userEvent.type(zip, "12345");

	//Expect typed text to be present
	expect(fName).toHaveValue("Luke");
	expect(lName).toHaveValue("Parr");
	expect(address).toHaveValue("1 Fake st");
	expect(city).toHaveValue("BigTown");
	expect(state).toHaveValue("NV");
	expect(zip).toHaveValue("12345");

	//Click form submit button
	userEvent.click(submitButton)

	//Select success message and expect it to exist
	const submitMsg = screen.queryByText(/Your new green friends will be shipped to:/i);
	expect(submitMsg).toBeInTheDocument();
	
	//Select form data returned in success message
	const formDataName = submitMsg.nextElementSibling.nextElementSibling.nextElementSibling;
	const formDataStreet = formDataName.nextElementSibling;
	const formDataCSZ = formDataStreet.nextElementSibling;
	
	//Assert that returned data should exist
	expect(formDataName).toBeTruthy();
	expect(formDataStreet).toBeTruthy();
	expect(formDataCSZ).toBeTruthy();

});
