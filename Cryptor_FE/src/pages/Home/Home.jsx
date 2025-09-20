
import HeaderMenu from './HeaderMenu';
import './Home.css'
import PlayfairForm from './PlayfairForm';
const Home = () => {
  return (
    <div className='homepage'>
      <h2>About Cryptor</h2>
      <span>A simple program, located in Internet web pages to perform simple cryptography calculations.
        Can't find calculators you've been looking for? Please suggest an idea for a new online calculator. If you leave a description of what you want to calculate, a member of our team will respond to your request and produce a calculator that meets your requirements.
      </span>
      <h2>Available tools</h2>
      <ul>
      <li>
          <a href="/playfair">
            Playfair
          </a> - A classical cipher that encrypts digraphs using a 5x5 key matrix.
        </li>
        <li>
          <a href="/rsa">
            Rivest Shamir Adleman (RSA)
          </a> - A public-key cryptosystem used for secure data transmission.
        </li>
        <li>
          <a href="/rsademo">
            RSA Demo
          </a> - An interactive demonstration of the RSA algorithm, including encryption and decryption.
        </li>
      </ul>
    </div>
  );
}

export default Home;