import React, { useState, useRef } from 'react'; // Import useRef
import styles from './FormValidator.module.css';
import axios from 'axios'; // Import axios
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA

const minUser  = 5;
const minPass = 8;

const FormValidator = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [valid, setValid] = useState({
    name: false, // true means invalid, false means valid
    password: false, // true means invalid, false means valid
  });

  const [formStatus, setFormStatus] = useState(''); // To display form submission status
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const recaptchaRef = useRef(null); // Create a ref for the reCAPTCHA component

  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_SITE_KEY;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => { 
    const { name, value } = e.target;
    if (value.length < 2) {
      setValid((prevValid) => ({ ...prevValid, [name]: true }));
    } else {
      setValid((prevValid) => ({ ...prevValid, [name]: false }));
    }
  };

  const isFormValidClientSide = () => {
    const newValidState = {};
    let allFieldsAreValid = true;

    if (formData.name.length < minUser) {
        newValidState.name = true;
        allFieldsAreValid = false;
    } else {
        newValidState.name = false;
    }

    if (formData.password.length < minPass) {
        newValidState.password = true;
        allFieldsAreValid = false;
    } else {
        newValidState.password = false;
    }

    setValid(newValidState);

    return allFieldsAreValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(''); 
    setIsLoading(true); 

    // 1. Client-side validation first
    const clientSidePassed = isFormValidClientSide();
    if (!clientSidePassed) {
      setFormStatus('Error: Please correct the highlighted fields.');
      setIsLoading(false);
      return;
    }

    // 2. reCAPTCHA execution
    if (!recaptchaRef.current) {
      setFormStatus('Error: reCAPTCHA component not initialized.');
      setIsLoading(false);
      return;
    }

    let recaptchaToken;
    try {
      recaptchaToken = await recaptchaRef.current.executeAsync();
    } catch (e) {
      setFormStatus('Error: reCAPTCHA execution failed. Please try again.');
      console.error('reCAPTCHA execute error:', e);
      setIsLoading(false);
      recaptchaRef.current.reset(); // Reset reCAPTCHA on execution error
      return;
    }

    if (!recaptchaToken) {
      setFormStatus('reCAPTCHA verification failed. Please try again.');
      setIsLoading(false);
      recaptchaRef.current.reset(); // Reset reCAPTCHA if no token
      return;
    }

    // 3. Send data to backend with Axios
    try {
      const response = await axios.post(`${BACKEND_URL}/cap`, {
        name: formData.name,      // Sending 'name' directly
        password: formData.password, // Sending 'password' directly
        recaptchaToken: recaptchaToken, // Sending 'recaptchaToken' directly
      });

      const data = response.data; // Axios puts response data directly on .data

      if (data.success) {
        setFormStatus('Success: Your data has been submitted and verified!'); // Customize this message
        setFormData({ name: '', password: '' }); // Clear form on success
      } else {
        setFormStatus(`Error: ${data.message || 'Unknown error during submission.'}`);
      }
    } catch (error) {
      if (error.response) {
        setFormStatus(`Error: ${error.response.data.error || 'Server responded with an error.'}`);
        console.error('Server error response:', error.response.data);
      } else if (error.request) {
        setFormStatus('Network error: Could not reach the server. Please try again.');
        console.error('No response from server:', error.request);
      } else {
        setFormStatus(`An unexpected error occurred: ${error.message}`);
        console.error('Axios setup error:', error.message);
      }
    } finally {
      setIsLoading(false);
      recaptchaRef.current.reset();
    }
  };

  const handleScriptLoad = () => {
    console.log("reCAPTCHA script loaded successfully.");
  };

  const handleScriptError = (error) => {
    console.error("reCAPTCHA script failed to load:", error);
    setFormStatus("Failed to load reCAPTCHA. Please check your internet connection.");
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled = isLoading; // Only disable during loading for simplicity here,
                                       // could also disable if client-side validation fails.

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label
          className={valid.name ? styles.errorLabel : ''}
          htmlFor="name"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={valid.name ? styles.errorInput : ''}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required // HTML5 validation
        />
        <span className={valid.name ? styles.errorLabel : ''}>{valid.name && " min. 5 chars"}</span>
      </div>
      <div className={styles.inputGroup}>
        <label className={valid.password ? styles.errorLabel : ''} htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          className={valid.password ? styles.errorInput : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required // HTML5 validation
        />
        <span className={valid.password ? styles.errorLabel : ''}>{valid.password && " min. 8 chars"}</span>
      </div>

      {/* Invisible reCAPTCHA component */}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
        size="invisible"
        asyncScriptOnLoad={handleScriptLoad}
        onErrored={handleScriptError}
      />

      {formStatus && (
        <p className={formStatus.startsWith('Error') ? styles.errorMessage : styles.successMessage}>
          {formStatus}
        </p>
      )}

      <button type="submit" disabled={isSubmitDisabled} className={styles.submitButton}>
        <span>{isLoading ? 'Submitting...' : 'Submit Form'}</span>
      </button>


      {/* reCAPTCHA privacy text */}
      <p style={{ fontSize: '0.75em', marginTop: '10px', color: '#666', textAlign: 'center' }}>
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>{' '}
        apply.
      </p>
    </form>
  );
};

export default FormValidator;