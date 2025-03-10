import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-5 text-center text-muted">
        <p>
        <small>
            This project was made possible through the hard work and dedication of 
            <a href="https://x.com/sat_stats" target="_blank" rel="noopener noreferrer"> @sat_stats </a>. Please give him a follow on X. 
        </small>
        </p>
        <p>
        <small style={{
            'font-size': "0.7rem", 
            opacity: "0.7;"
        }}>
            <strong>Disclaimer:</strong> 
            This page uses data provided by the API at <a href="https://api.deezy.io" target="_blank" rel="noopener noreferrer">https://api.deezy.io</a>. 
            The data is provided "as is," and the creator of this page does not profit from its use. 
            <span>This is not financial advice. Use the data at your own risk.</span>
        </small>
        </p>
        
        <div className="mb-3">
        <a href="https://asats21.github.io/collectors-vault/" target="_blank" rel="noopener noreferrer" style={{"text-decoration": "none"}}>
            <button style={{border: "2px solid #E89A02"}} className="nav-button-footer rarity">Collector's Vault</button>
        </a>
        </div>

    </footer>
  );
};

export default Footer;