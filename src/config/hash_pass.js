const crypto = require('crypto-js');

exports.hash_input = (input) => {
    let mystr = crypto.AES.encrypt(input, "key").toString();
    return mystr;
  };
  
  exports.hash_output = (output) => {
    let bytes = crypto.AES.decrypt(output, "key");
    let mystr = bytes.toString(crypto.enc.Utf8);
    return mystr;
  };