import React from 'react';
import {fireEvent, getAllByRole, getByRole, getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText('Contact Form');
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less than 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText('First Name*');
    expect(firstName.length >= 5);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const inputFirstName = screen.getByLabelText('First Name*');
    const inputLastName = screen.getByLabelText('Last Name*');
    const inputEmail = screen.getByLabelText('Email*');
    expect(inputFirstName).not.toBeNull();
    expect(inputLastName).not.toBeNull();
    expect(inputEmail).not.toBeNull();
    
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const inputFirstName = screen.getByLabelText('First Name*');
    userEvent.type(inputFirstName, 'Cynthia')
    const inputLastName = screen.getByLabelText('Last Name*');
    userEvent.type(inputLastName, 'Canada')
    const inputEmail = screen.getByLabelText('Email*');
    expect(inputFirstName).not.toBeNull();
    expect(inputLastName).not.toBeNull();
    expect(inputEmail).not.toBeNull();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const inputFirstName = screen.getByLabelText('First Name*');
    userEvent.type(inputFirstName, 'Cynthia')
    const inputLastName = screen.getByLabelText('Last Name*');
    userEvent.type(inputLastName, 'Canada')
    const inputEmail = screen.getByLabelText('Email*');
    userEvent.type(inputEmail, '1234567@abccom')
    expect(inputFirstName).not.toBeNull();
    expect(inputLastName).not.toBeNull();
    expect(inputEmail).not.toBeNull();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const inputFirstName = screen.getByLabelText('First Name*');
    userEvent.type(inputFirstName, 'Cynthia')
    const inputLastName = screen.getByLabelText('Last Name*');
    // userEvent.type(inputLastName, 'Canada')
    const inputEmail = screen.getByLabelText('Email*');
    userEvent.type(inputEmail, '1234567@abccom')
    expect(inputFirstName).not.toBeNull();
    expect(inputLastName).not.toBeNull();
    expect(inputEmail).not.toBeNull();

    const button = screen.getByRole('button');
    userEvent.click(button)

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const inputFirstName = screen.getByLabelText('First Name*');
    userEvent.type(inputFirstName, 'Cynthia')
    const inputLastName = screen.getByLabelText('Last Name*');
    userEvent.type(inputLastName, 'Canada')
    const inputEmail = screen.getByLabelText('Email*');
    userEvent.type(inputEmail, '1234567@abccom')
    expect(inputFirstName).not.toBeNull();
    expect(inputLastName).not.toBeNull();
    expect(inputEmail).not.toBeNull();

    const button = screen.getByRole('button');
    userEvent.click(button)
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const inputFirstName = screen.getByLabelText('First Name*');
    userEvent.type(inputFirstName, 'Cynthia')
    const inputLastName = screen.getByLabelText('Last Name*');
    userEvent.type(inputLastName, 'Canada')
    const inputEmail = screen.getByLabelText('Email*');
    userEvent.type(inputEmail, '1234567@abccom')
    const inputMessage = screen.getByLabelText('Message');
    userEvent.type(inputMessage, 'This is my message');
    expect(inputFirstName).not.toBeNull();
    expect(inputLastName).not.toBeNull();
    expect(inputEmail).not.toBeNull();

    const button = screen.getByRole('button');
    userEvent.click(button)
});
