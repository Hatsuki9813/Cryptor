

import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './PlayfairForm.css'
import Button from 'react-bootstrap/Button';

const PlayfairForm = () => {
  const [key, setKey] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [result, setResult] = useState("");
  const [matrix, setMatrix] = useState(""); // State để lưu ma trận
  const [action, setAction] = useState("1"); // Default to "Encrypt"
  
  const handleGenerateMatrix = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/generateMatrix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      const data = await response.json();

      if (response.ok) {
        const formattedMatrix = data.matrix
        .map((row) => row.join(" ")) // Nối từng dòng bằng dấu cách
        .join("\n"); // Nối các dòng bằng ký tự xuống dòng

        setMatrix(formattedMatrix); // Cập nhật chuỗi vào state
      } else {
        setMatrix("Error generating matrix");
      }
    } catch (error) {
      setMatrix("Failed to connect to the server");
    }
  };

  const handleEncrypt = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/encrypt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key, text: plaintext }),
        });

        const data = await response.json();

        if (response.ok) {
          setResult(data.encryptedText || "No result");
        } else {
          setResult(data.error || "Error during encryption");
        }
      } catch (error) {
        setResult("Failed to connect to the server");
      }
    
  };
  const handleDecrypt = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/decrypt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key, text: plaintext }),
        });

        const data = await response.json();

        if (response.ok) {
          setResult(data.decryptedText || "No result");
        } else {
          setResult(data.error || "Error during encryption");
        }
      } catch (error) {
        setResult("Failed to connect to the server");
    }
  };
  const handleEncryptAndDisplayMatrix = () => {
    if (action==1) {
    handleGenerateMatrix();
    handleEncrypt();
    } else {
    handleGenerateMatrix();
    handleDecrypt();
    }
  };
  return (
    <div className="PageContainer">
    <div className="playfair-form-container">
      <FloatingLabel
        controlId="floatingCiphertext"
        label="Plaintext"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter plaintext"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingKey" label="Key">
        <Form.Control
          type="text"
          placeholder="Enter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </FloatingLabel>
      <Form.Select
        className="mt-3"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      >
        <option value="1">Encrypt</option>
        <option value="2">Decrypt</option>
      </Form.Select>
      <div className="Matrix">
        <Form.Text id="Matrixname" muted className="form-text-label">
          Playfair square
        </Form.Text>
        <Form.Group className="MatrixArea">
          <Form.Control as="textarea" value={matrix} readOnly rows={5} />
        </Form.Group>
      </div>
      <div className="Matrix">
        <Form.Text id="ResultName" muted className="form-text-label">
          Result
        </Form.Text>
        <Form.Group className="MatrixArea">
          <Form.Control as="textarea" value={result} readOnly rows={2} />
        </Form.Group>
      </div>
      <div  className="ButtonContainer"> 
      <Button variant="primary"  onClick={handleEncryptAndDisplayMatrix}>
        Calculate
      </Button>
      </div>
    </div>
    </div>
  );
};


export default PlayfairForm;
