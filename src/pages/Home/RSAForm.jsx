import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import './RSAForm.css'
const RSAForm = () => {
  const [keysize, setKeysize] = useState()
  const [publicKey,setPublicKey] = useState('');
  const [privateKey,setPrivateKey] = useState('');
  const [intputKey, setInputKey] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState("");
  const [action, setAction] = useState('1')
const handleGenerateKey =  async () => {
  try {
    const response = await fetch("http://localhost:5000/rsagenerate-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keySize: keysize }),
    });

    const data = await response.json();
    if (response.ok) {
      setPublicKey(data.publicKey || "No public key result");
      setPrivateKey(data.privateKey || "No private key result");

    } else {
      setPublicKey(data.error || "No public key result");
      setPrivateKey(data.error || "No private key result");
    }
  } catch (error) {
    console.log("Something wrong...")
}
}

const handleRSAEncrypt = async () => {
  try {
    const response = await fetch("http://localhost:5000/rsaencrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: text, publickey: intputKey }),
    });

    const data = await response.json();

    if (response.ok) {
      setResult(data.encryptedData || "No result");
      console.log('encrypted data: ' + data.encryptedData)
    } else {
      setResult(data.message || "Error during encryption");
    }
  } catch (error) {
    setResult("Failed to connect to the server");
  }
};
const handleRSADecrypt = async () => {
  try {
    const response = await fetch("http://localhost:5000/rsadecrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ encryptedData: text, privateKey:intputKey }),
    });
    const data = await response.json();
    if (response.ok) {
      setResult(data.decryptedData || "No result");
    } else {
      setResult(data.error || "Error during encryption");
    }
  } catch (error) {
    setResult("Failed to connect to the server");
}
};
const callEncryptDecrypt = () => {
  if(action == 1) {
  handleRSAEncrypt();
  } else {
  handleRSADecrypt();
  }
}
  return (
    <Container fluid className="RSAPageContainer" >
      <div className="KeyGenerate" >
        <Row>
          {/* Public Key */}
          <Col md={6}>
            <Card className="mb-3" style={{ height: '150px', overflowY: 'scroll' }}>
              <Card.Header className="bg-primary text-white">Public Key</Card.Header>
              <Card.Body>
                <pre>{publicKey}</pre>
              </Card.Body>
            </Card>
          </Col>

          {/* Private Key */}
          <Col md={6}>
            <Card className="mb-3" style={{ height: '150px', overflowY: 'scroll' }}>
              <Card.Header className="bg-secondary text-white">Private Key</Card.Header>
              <Card.Body>
                <pre>{privateKey}</pre>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="KeyFunctions">
          <Form.Text id="Keysize"  className="rsaform-text-label">
            Choose key size:
          </Form.Text>
          <Form.Select className="mt-3"  onChange={(e) => setKeysize(Number(e.target.value))} >
            <option value="512">512</option>
            <option value="1024">1024</option>
            <option value="2048">2048</option>
          </Form.Select>
          <Form.Text id="Functions"  className="rsaform-text-label" >
            Choose function:
          </Form.Text>
          <Form.Select className="mt-3" value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="1">Encrypt</option>
            <option value="2">Decrypt</option> 
          </Form.Select>
          <Button variant="primary" className="ButtonContainer" onClick={handleGenerateKey}>
            Generate Key
          </Button>
        </div>
        <div className="encrdecrfunctions"> 
         <Form.Text id="TextInput" className="rsaform-text-label">
                  Enter text to encrypt/decrypt
                </Form.Text>
                <Form.Group className="MatrixArea">
                  <Form.Control as="textarea" value={text}  rows={5} onChange={(e) => setText(e.target.value)} />
          </Form.Group>
          <Form.Text id="KeyInput" className="rsaform-text-label">
                  Enter public/private key
                </Form.Text>
                <Form.Group className="MatrixArea">
                  <Form.Control as="textarea" value={intputKey.replace(/\\n/g, '\n')} rows={5} onChange={(e) => setInputKey(e.target.value)}/>
          </Form.Group>
          <Form.Text id="Result" className="rsaform-text-label">
                  Result
                </Form.Text>
                <Form.Group className="MatrixArea">
                  <Form.Control as="textarea" value={result} rows={3} />
          </Form.Group>
          <Button variant="primary" className="ButtonContainer" onClick={callEncryptDecrypt}>
            Calculate
          </Button>
        </div>
      </div>

    </Container>
  )
};
export default RSAForm;