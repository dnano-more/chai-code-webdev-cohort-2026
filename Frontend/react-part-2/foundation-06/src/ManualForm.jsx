import React, { useState } from "react";

const ROLES = ["Frontend", "Backend", "Fullstack"];     

function ManualForm() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        role: "frontend",
        experiene: "",
        cover: "",
    })

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);   // defalut false matlab form submitted nahi hain abhi. submit hone pe true hoga


    function set(field) {
        return (e) => setValues ((v) => ({...v, [field]: e.target.value}))
    }

    function validate(v) {
        const e = {}
        if(!v.name.trim()) e.name = " name is required! "
        if(!v.email.trim()) e.email = " email is required! "

        return e
    }

    function submit(ev) {
        ev.preventDefault();
        const e = validate(values)
        setErrors(e)
        if(Object.keys(e).length === 0) setSubmitted(true)
    }

    if(submitted) {
        return (
            <div>
                <h2>Application submitted</h2>
                {values.name} - {values.email} - {values.role} - {values.experiene} - {values.cover}
            </div>
        )
    }

  return <div>
    <form onSubmit={submit} noValidate>
        <label>
            Full Name
            <input vlaue={values.name} onChange={set('name')} />
            {errors.name && <span>{errors.name}</span>}
            {/* {errors.name !== "" ? <span>{errors.name}</span> : null} alternative way to write code of above line*/}
        </label> 
        <br />
        <label>
            Email
            <input vlaue={values.email} onChange={set('email')} />
            {errors.email && <span>{errors.email}</span>}
        </label>
        <br />
        <button type="submit">Submit</button>
    </form>
  </div>;
}

export default ManualForm;
