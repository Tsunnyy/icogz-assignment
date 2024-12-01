import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import img from "../src/assets/thank.gif"

function App() {
  const [activeTab, setActiveTab] = useState("1");
  const [completedSteps, setCompletedSteps] = useState({
    1: false,
    2: false,
    3: false
  });

  const [formData, setFormData] = useState({
    FullName: '',
    displayName: '',
    workSpaceName: '',
    workSpaceUrl: '',
    forMyself: true,
    forTeam: false,
  });

  const SignupSchema = Yup.object().shape({
    FullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Full Name is Required'),
    displayName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Display Name is Required'),
  });

  const SignupSchemaTwo = Yup.object().shape({
    workSpaceName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Workspace Name is Required'),
  });

  const handleTabChange = (nextTab) => {
    // Only change tab if the tab is completed or a previously completed tab
    if (completedSteps[nextTab] ||
      Object.keys(completedSteps)
        .filter(step => parseInt(step) < parseInt(nextTab))
        .every(step => completedSteps[step])) {
      setActiveTab(nextTab);
    }
  };

  return (
    <>
      <div className="mainFormPage">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => handleTabChange(k)}
          id="controlled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="1"
            title={<span className={completedSteps[1] ? 'completed-tab' : ''}>1</span>}
          >
            <h2>Welcome! First things first...</h2>
            <p>You can always change theme later</p>
            <Formik
              enableReinitialize
              initialValues={{
                FullName: formData.FullName,
                displayName: formData.displayName,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                setFormData({
                  ...formData,
                  FullName: values.FullName,
                  displayName: values.displayName,
                });
                // Mark step 1 as completed
                setCompletedSteps(prev => ({ ...prev, 1: true }));
                setActiveTab("2");
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="position-relative">
                    <label>Full Name</label>
                    <Field name="FullName" />
                    {errors.FullName && touched.FullName && (
                      <div className="err">{errors.FullName}</div>
                    )}
                  </div>
                  <div className="position-relative">
                    <label>Display Name</label>
                    <Field name="displayName" />
                    {errors.displayName && touched.displayName && (
                      <div className="err">{errors.displayName}</div>
                    )}
                  </div>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </Tab>

          <Tab
            eventKey="2"
            title={<span className={completedSteps[2] ? 'completed-tab' : ''}>2</span>}
          >
            <h2>Lets set up a home for all your work</h2>
            <p>You can always create another workspace later</p>
            <Formik
              initialValues={{
                workSpaceName: formData.workSpaceName,
                workSpaceUrl: formData.workSpaceUrl,
              }}
              validationSchema={SignupSchemaTwo}
              onSubmit={(values) => {
                setFormData({
                  ...formData,
                  workSpaceName: values.workSpaceName,
                  workSpaceUrl: values.workSpaceUrl,
                });
                // Mark step 2 as completed
                setCompletedSteps(prev => ({ ...prev, 2: true }));
                setActiveTab("3");
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="position-relative">
                    <label>WorkSpace Name</label>
                    <Field name="workSpaceName" />
                    {errors.workSpaceName && touched.workSpaceName && (
                      <div className="err">{errors.workSpaceName}</div>
                    )}
                  </div>
                  <div className="position-relative">
                    <label>WorkSpace URL (Optional)</label>
                    <Field name="workSpaceUrl" />
                  </div>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </Tab>

          <Tab
            eventKey="3"
            title={<span className={completedSteps[3] ? 'completed-tab' : ''}>3</span>}
          >
            <h2>How are you planning to use Eden?</h2>
            <p>We'll streamline your setup experience accordingly</p>
            <Formik
              initialValues={{
                forMyself: formData.forMyself,
                forTeam: formData.forTeam,
              }}
              onSubmit={(values) => {
                setFormData({
                  ...formData,
                  forMyself: values.forMyself,
                  forTeam: values.forTeam,
                });
                // Mark step 3 as completed
                setCompletedSteps(prev => ({ ...prev, 3: true }));
                setActiveTab("4");
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <div className="boxMain">
                    <div
                      className={`box position-relative ${values.forMyself ? "selected" : ""}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
                        <path fill="currentColor" d="M939.574 858.383c-157.341-57.318-207.64-105.702-207.64-209.298c0-62.17 51.555-102.462 69.128-155.744c17.575-53.283 27.741-116.367 36.191-162.256s11.809-63.638 16.404-112.532C859.276 157.532 818.426 0 600 0C381.639 0 340.659 157.532 346.404 218.553c4.596 48.894 7.972 66.645 16.404 112.532c8.433 45.888 18.5 108.969 36.063 162.256c17.562 53.286 69.19 93.574 69.19 155.744c0 103.596-50.298 151.979-207.638 209.298C102.511 915.83 0 972.479 0 1012.5V1200h1200v-187.5c0-39.957-102.574-96.606-260.426-154.117" />
                      </svg>
                      <Field
                        name="forMyself"
                        type="checkbox"
                        onChange={(e) => {
                          setFieldValue("forMyself", e.target.checked);
                          setFieldValue("forTeam", false); // Uncheck the other checkbox
                        }}
                      />
                      <h5>For myself</h5>
                      <p className='text-start mb-0'>Write better, Think more clearly, Stay organized. </p>
                    </div>
                    <div
                      className={`box position-relative ${values.forTeam ? "selected" : ""}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                        <path fill="currentColor" fillRule="evenodd" d="M426.667 320v64h64v42.667h-64v64H384v-64h-64V384h64v-64zm-176-85.333c60.31 0 109.485 49.03 111.906 110.451l.094 4.749v12.8h-64v64H64v-76.8c0-62.033 47.668-112.614 107.383-115.104l4.617-.096zm-37.334-192c41.238 0 74.667 33.43 74.667 74.667c0 39.862-31.238 72.429-70.57 74.556l-4.097.11c-41.237 0-74.666-33.43-74.666-74.666c0-39.863 31.238-72.43 70.57-74.557z" />
                      </svg>
                      <Field
                        name="forTeam"
                        type="checkbox"
                        onChange={(e) => {
                          setFieldValue("forTeam", e.target.checked);
                          setFieldValue("forMyself", false); // Uncheck the other checkbox
                        }}
                      />
                      <h5>With my team</h5>
                      <p className='text-start mb-0'>Wikis, docs, tasks & projects, all in one place</p>
                    </div>
                  </div>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </Tab>

          <Tab eventKey="4" title="4">
            {/* <div className="text-center">
              <img src={img} alt="Thank You" className='img-fluid' />
            </div> */}
            <h2>Congratulations, {formData.FullName.split(" ")[0]}! </h2>
            <p>You have completed onboarding, you can start using the Eden!</p>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Full Name</th>
                    <td>{formData.FullName}</td>
                  </tr>
                  <tr>
                    <th>Display Name</th>
                    <td>{formData.displayName}</td>
                  </tr>
                  <tr>
                    <th>Workspace Name</th>
                    <td>{formData.workSpaceName}</td>
                  </tr>
                  <tr>
                    <th>Workspace URL</th>
                    <td>{formData.workSpaceUrl || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <th>Purpose</th>
                    <td>{formData.forMyself ? 'Personal Use' : formData.forTeam ? 'Team Collaboration' : "Not specified"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default App;