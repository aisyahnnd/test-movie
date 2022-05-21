import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';

import { database } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  //Optional error handling
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const databaseRef = collection(database, 'userLogin');
  console.log(777, databaseRef)

  const onSubmit = async (event) => {

    setError(null)

    // try {
    //   await addDoc(databaseRef, {
    //     name: name, 
    //     email: email,
    //     password: passwordTwo
    //   })
    //   .then(() => {
    //       alert('Successful Registration!');
    //   })

      if(passwordOne === passwordTwo) {
        

      createUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        addDoc(databaseRef, {
          name: name, 
          email: email,
          password: passwordTwo
        })
      })
      .then(authUser => {

        console.log("Success. The user is created in firebase")
        router.push("/auth/home");
      })
      .catch(error => {
        setError(error.message)
      });
      } else {
        setError("Password do not match") }
      event.preventDefault();

    // } catch (error) {
    //   setError(error.message)
    // }
  };

  return (
    <Container className="text-center" style={{ padding: '40px 0px'}}>
      <Row>
        <Col>
          <Form style={{maxWidth: '400px', margin: 'auto'}} onSubmit={onSubmit}>
          { error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label for="signUpName" sm={4}>Name</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                  id="signUpName"
                  placeholder="Name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpEmail" sm={4}>Email</Label>
              <Col sm={8}>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword" sm={4}>Password</Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword2" sm={4}>Confirm Password</Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row>
             <Col>
               <Button>Sign Up</Button>
             </Col>
           </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp;
