const fs = require('fs');

// Function to convert number from given base to decimal
const convertToDecimal = (value, base) => parseInt(value, base);

// Function to perform Lagrange interpolation and find the constant term (c)
const lagrangeInterpolation = (points) => {
    let constantTerm = 0;
    
    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let term = yi;
        
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj, _] = points[j];
                term *= -xj / (xi - xj);
            }
        }
        constantTerm += term;
    }
    
    return Math.round(constantTerm); // Ensure integer result
};

// Read and parse the JSON input file
fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    const input = JSON.parse(data);
    const n = input.keys.n;
    const k = input.keys.k;
    
    // Extract and decode points
    let points = Object.keys(input)
        .filter(key => key !== 'keys')
        .map(key => [parseInt(key), convertToDecimal(input[key].value, parseInt(input[key].base))]);
    
    // Select first k points to interpolate
    points = points.slice(0, k);
    
    // Compute the constant term
    const secret = lagrangeInterpolation(points);
    console.log('Secret:', secret);
});