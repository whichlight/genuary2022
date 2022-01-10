/**
 * genuary day 10
 * Prompt: machine learning, wrong answers only
 * 
 * <3 whichlight 
 * 
 * chat with shakespeare
 * 
 * ref: 
 * https://examples.ml5js.org/p5js/charrnn/charrnn_text/
 * https://ml5js.org/
 * 
 */

let charRNN;
let textInput;
let chatbox;
let button;
let runningInference = false;
let res; 

function setup() {
  noCanvas();

  // Create the LSTM Generator passing it the model directory
  charRNN = ml5.charRNN('https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/charRNN/shakespeare/', modelReady);

  // Grab the DOM elements
  textInput = select('#textInput');
  button = select('#generate');
  chatbox = select('#chatbox');


  // DOM element events
  button.mousePressed(generate);
}


function modelReady() {
  select('#status').html('Model Loaded');
}

// Generate new text
function generate() {

  if(!runningInference) {
    runningInference = true;

    // Update the status log
    select('#status').html('Generating...');

    // Grab the original text
    const original = textInput.value();

    //add to chat
    chatbox.html("<b>me:</b> " + original +"<br>", true);
 

    // Make it to lower case
    const txt = original.toLowerCase();

    // Check if there's something to send
    if (txt.length > 0) {
      // This is what the LSTM generator needs
      // Seed text, temperature, length to outputs
      // TODO: What are the defaults?
      const data = {
        seed: txt,
        temperature: 0.9,
        length: 150
      };

      charRNN.generate(data, gotData);

      // When it's done
      function gotData(err, result) {
        // Update the status log
        select('#status').html('Ready!');
        runningInference = false;
        res = result.sample.split('.'); 
        res.pop();
        let msgresponse = res.join('. ')+'.';
        if (msgresponse == ".") msgresponse = "...";
        chatbox.html("<b>shakespeare:</b> " + msgresponse, true);
        chatbox.html("<br>",true);
      }
    }
  }
}