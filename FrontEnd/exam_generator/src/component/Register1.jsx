import React, { useState } from 'react';
import { FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaLock, FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f4068 0%, #162447 100%)',
        fontFamily: 'Arial, sans-serif',
        padding: '20px'
    },
    formCard: {
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '15px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        maxWidth: '550px',
        width: '95%',
        textAlign: 'center',
        border: '1px solid #eee'
    },
    heading: {
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#222'
    },
    inputGroup: {
        marginBottom: '22px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '6px'
    },
    inputField: {
        width: '100%',
        padding: '8px 0',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        backgroundColor: 'transparent'
    },
    inputIcon: {
        color: '#888',
        fontSize: '18px',
        marginLeft: '10px',
        cursor: 'pointer'
    },
    errorText: {
        color: 'red',
        fontSize: '12px',
        textAlign: 'left',
        marginTop: '5px',
        marginBottom: '-10px'
    },
    termsContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
        gap: '8px'
    },
    authButton: {
        width: '100%',
        padding: '15px',
        border: 'none',
        borderRadius: '50px',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        background: 'linear-gradient(45deg, #007bff, #0056b3)',
        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.4)'
    },
    link: { color: '#222', fontWeight: 'bold', textDecoration: 'none' }
};

const toastOptions = {
    autoClose: 3000,
    theme: 'colored',
    position: 'top-right'
};

const Register1 = () => {
    const [data, setData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Student',
        agreed: false
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const getStyle = (field) => ({
        ...styles.inputGroup,
        borderBottom: errors[field] ? '1px solid red' : '1px solid #ccc'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ ...data, [name]: type === 'checkbox' ? checked : value });
    };

    const clearName = () => {
        setData({ ...data, name: '' });
        toast.info('Name cleared!', toastOptions);
    };

    const validate = () => {
        const er = {};

        if (!data.name.trim()) er.name = 'Name required';

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.email)) er.email = 'Invalid email';

        const ageNum = Number(data.age);
        if (!ageNum) er.age = 'Valid age required';
        else if (data.role === 'Instructor' && ageNum < 18)
            er.age = 'Instructor must be 18+';

        if (data.password.length < 6)
            er.password = 'Min 6 characters';

        if (data.password !== data.confirmPassword)
            er.confirmPassword = 'Passwords do not match';

        if (!data.agreed) er.agreed = 'Accept Terms';

        setErrors(er);
        return Object.keys(er).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error('Fix the errors.', toastOptions);
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    age: data.age,
                    email: data.email,
                    password: data.password,
                    role: data.role
                }),
            });

            if (!response.ok) {
                const msg = await response.text();
                throw new Error(msg);
            }

            toast.success("Registration Successful!", toastOptions);
        } catch (err) {
            toast.error(err.message, toastOptions);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formCard}>
                <h2 style={styles.heading}>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div style={getStyle('name')}>
                        <input
                            style={styles.inputField}
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <FiTrash2 style={styles.inputIcon} onClick={clearName} />
                    </div>
                    {errors.name && <div style={styles.errorText}>{errors.name}</div>}

                    {/* Email */}
                    <div style={getStyle('email')}>
                        <input
                            style={styles.inputField}
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <div style={styles.errorText}>{errors.email}</div>}

                    {/* Age */}
                    <div style={getStyle('age')}>
                        <input
                            style={styles.inputField}
                            type="number"
                            name="age"
                            placeholder="Your Age"
                            value={data.age}
                            onChange={handleChange}
                        />
                        <FaUser style={styles.inputIcon} />
                    </div>
                    {errors.age && <div style={styles.errorText}>{errors.age}</div>}

                    {/* Password */}
                    <div style={getStyle('password')}>
                        <input
                            style={styles.inputField}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        <div style={styles.inputIcon} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>
                    {errors.password && <div style={styles.errorText}>{errors.password}</div>}

                    {/* Confirm Password */}
                    <div style={getStyle('confirmPassword')}>
                        <input
                            style={styles.inputField}
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={data.confirmPassword}
                            onChange={handleChange}
                        />
                        <FaLock style={styles.inputIcon} />
                    </div>
                    {errors.confirmPassword && <div style={styles.errorText}>{errors.confirmPassword}</div>}

                    {/* Role */}
                    <div style={getStyle('role')}>
                        <select
                            style={{ ...styles.inputField, appearance: 'none' }}
                            name="role"
                            value={data.role}
                            onChange={handleChange}
                        >
                            <option value="Student">Student</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <FaLock style={styles.inputIcon} />
                    </div>

                    {/* Terms */}
                    <div style={styles.termsContainer}>
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={data.agreed}
                            onChange={handleChange}
                        />
                        <label>I agree to the <strong>Terms of Service</strong></label>
                    </div>
                    {errors.agreed && <div style={styles.errorText}>{errors.agreed}</div>}

                    <button type="submit" style={styles.authButton}>SIGN UP</button>
                </form>

                <p style={{ marginTop: '30px' }}>
                    Already have an account? <Link to="/login" style={styles.link}>Login</Link>
                </p>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Register1;
