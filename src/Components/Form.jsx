import React, { useEffect, useState } from 'react';
import { AddFormAPI } from '../Services/allAPI';

function Form() {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const [formDetails, setFormDetails] = useState({
        name: "", password: "", DOB: "", number: "", select: "", address: "", file: ""
    });

    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (formDetails.file) {
            setPreview(URL.createObjectURL(formDetails.file));
        }
    }, [formDetails.file]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormDetails({ ...formDetails, file: e.target.files[0] });
    };

    const addForms = async () => {
        const { name, password, DOB, number, select, address, file } = formDetails;

        if (!name || !password || !DOB || !number || !select || !address || !file) {
            alert('Please fill out all fields');
            return;
        }

        const reqBody = new FormData();
        reqBody.append("name", name);
        reqBody.append("password", password);
        reqBody.append("DOB", DOB);
        reqBody.append("number", number);
        reqBody.append("select", select);
        reqBody.append("address", address);
        reqBody.append("file", file);

        const reqHeader = {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await AddFormAPI(reqBody, reqHeader);
            console.log(result);
            if (result.status === 200) {
                console.log(result.data);
                alert('form created successfully')
            } else {
                console.log(result.response.data);
            }
        } catch (error) {
            console.error("Error adding form:", error);
        }
    };

    return (
        <div>
            <h2 className='fs-1 mt-3 mb-3'>Create Your Form Here</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" required value={formDetails.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" required value={formDetails.password} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="DOB" className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control" id="DOB" name="DOB" required value={formDetails.DOB} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Phone Number:</label>
                    <input type="text" className="form-control" id="number" name="number" required value={formDetails.number} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="select" className="form-label">Select:</label>
                    <select className="form-select" id="select" name="select" required value={formDetails.select} onChange={handleInputChange}>
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <textarea className="form-control" id="address" name="address" required value={formDetails.address} onChange={handleInputChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Upload File:</label>
                    <input type="file" className="form-control" id="file" name="file" required onChange={handleFileChange} />
                </div>
                <button onClick={addForms} type="button" className="btn btn-primary mb-3">Submit</button>
            </form>
        </div>
    );
}

export default Form;
