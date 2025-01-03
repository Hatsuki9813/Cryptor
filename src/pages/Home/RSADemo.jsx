import React, {useState} from 'react'
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import './RSADemo.css'
const RSADemo = () => {
    const [intp, setp] = useState()
    const [intq, setq] = useState()
    const [inte, sete] = useState('65537') // Thêm state cho e
    const [phi, setphi] = useState()
    const [action, setAction] = useState('1')
    const [publickey, setPublickey] = useState({e: '', n: ''})
    const [privatekey, setPrivatekey] = useState({d: '', n: ''})
    const [encryptedText, setEncryptedText] = useState('')
    const [inptext, inpsetText] = useState('');
    const [encrArray, setencrArray] = useState([])
    const handlegeneretepq = async () => {
      try {
        const response = await fetch("http://localhost:5000/rsademogenerate-primes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }

        });
        const data = await response.json();
        if (response.ok) {
          setp(data.p || "No result");
          setq(data.q || "No result");
        } else {
          console.log(data.error || "Error during encryption");
        }
      } catch (error) {
        console.log("Failed to connect to the server");
    }
    };
    const handleEncrypt = async () => {
      try {
        const response = await fetch("http://localhost:5000/rsademoencrypt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ p: intp, q: intq, e:inte, text: inptext}),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          setPublickey(data.publicKey || "No result");
          setPrivatekey(data.privateKey || "No result");
          setEncryptedText(data.encryptedText || "No result");
          setencrArray(data.encryptedArray  || "No result")
          setphi(data.phi || "No result")
        } else {
          console.log(data.message || "Error during encryption");
        }
      } catch (error) {
        console.log("Failed to connect to the server");
      }
    }
    const handleDecrypt = async () => {
      try {
        const response = await fetch("http://localhost:5000/rsademodecrypt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            d: privatekey.d,
            n: privatekey.n, 
            encryptedArray: encryptedText.trim().split(' ')
          }),
        });
        const data = await response.json();
     
        if (response.ok) {
          setEncryptedText(data.decryptedText || "No result");
        } else {
          console.log(data.error || "Error during decryption"); 
        }
      } catch (error) {
        console.log("Failed to connect to the server");
      }
     }
    const handleFunction = async () => {
      if(action==1) {
        handleEncrypt()
      } else {
        handleDecrypt()
      }
    }
    return (
      <div className="RSADemoPageContainer">
        <div className="RSADemo-form-container">
          <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter P</Form.Label>
              <Form.Control value={intp} placeholder="P..." onChange={(e) => setp(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Enter Q</Form.Label>
              <Form.Control value={intq} placeholder="Q..." onChange={(e) => setq(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Enter E</Form.Label>
              <Form.Control value={inte} placeholder="E..." onChange={(e) => sete(e.target.value)}/>
            </Form.Group>
            <div className="ButtonWrapper">
                      <Form.Select
                        className="mt-3"
                        value={action} 
                        onChange={(e) => setAction(e.target.value)}
                      >
                        <option value="1">Encrypt</option>
                        <option value="2">Decrypt</option>
                      </Form.Select>
              <Button variant="primary" className="ButtonContainer" onClick={handlegeneretepq}>
                Generate P, Q
              </Button>
            </div>
          </div>
          <div>
            <div className="Matrix">
              <Form.Text id="ResultName" className="form-text-label">
                Text
              </Form.Text>
              <Form.Group className="MatrixArea">
                <Form.Control as="textarea" rows={2}  value={inptext} onChange={(e) => inpsetText(e.target.value)}/>
              </Form.Group>
            </div>
            <div className="Result">
            <div className="ResultRow">
    <span className="ResultValue">
      Phi(n): {phi || ''}
    </span>
  </div>
  <div className="ResultRow">
    <span className="ResultValue">
      Public key: e: {publickey?.e || ''}, n: {publickey?.n || ''}
    </span>
  </div>
  <div className="ResultRow">
    <span className="ResultValue">
      Private key: d: {privatekey?.d || ''}, n: {privatekey?.n || ''}
    </span>
  </div>
  <div className="ResultRow">
    <span className="ResultValue">
      Result: {encryptedText || ''}
    </span>
  </div>
</div>
            <div className="ButtonWrapper">
              <Button variant="primary" className="ButtonContainer" onClick={handleFunction}>
                Calculate
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RSADemo;