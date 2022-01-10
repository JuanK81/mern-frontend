import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css'

const NewPLace = () => {
    return <form className='place-form'>
        <Input type='text' label='Title' element='input' validators={[]} errorText='Please enter a valid value.'/>
    </form>
};

export default NewPLace