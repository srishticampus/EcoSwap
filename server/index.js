var express=require("express")
var app=express();
var path=require('./Dbconnection')
const { exec } = require('child_process');

var cors=require("cors")
app.use(cors())

var parser=require("body-parser")
app.use(parser.json())

var route=require('./routes')
app.use("/",route)

app.post('/predict', (req, res) => {
    const inputData = req.body;

    // Validate input data
    if (!inputData || Object.keys(inputData).length === 0) {
        return res.status(400).json({ error: 'Invalid or empty input data' });
    }

    // Ensure all required fields are present
    const requiredFields = ['title', 'category', 'production_complexity', 'market_demand'];
    const missingFields = requiredFields.filter(field => !(field in inputData));
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    // Log input data for debugging
    console.log('Received input:', inputData);
    const jsonInput = JSON.stringify(inputData);
    console.log('Sending to Python:', jsonInput);

    // Run Python script using child_process
    const pythonPath = 'C:\\Users\\User\\AppData\\Local\\Programs\\Python\\Python311\\python.exe';
    const escapedJsonInput = jsonInput.replace(/"/g, '\\"');
    const command = `"${pythonPath}" predict.py "${escapedJsonInput}"`;
    console.log('Executing command:', command);
    exec(command, { timeout: 30000, cwd: __dirname }, (err, stdout, stderr) => {
        if (err) {
            console.error('Exec error:', err);
            console.error('Python stderr:', stderr);
            return res.status(500).json({ error: 'Prediction failed', details: err.message, stderr });
        }
        try {
            console.log('Python stdout:', stdout);
            const lines = stdout.trim().split('\n');
            const jsonLine = lines.find(line => line.startsWith('{') && line.endsWith('}'));
            if (!jsonLine) {
                throw new Error('No valid JSON output found');
            }
            const result = JSON.parse(jsonLine);
            console.log('Parsed result:', result);
            res.json({ data: result });
        } catch (parseErr) {
            console.error('Parse error:', parseErr);
            console.error('Raw output:', stdout);
            res.status(500).json({ error: 'Failed to parse prediction result', details: parseErr.message, rawOutput: stdout });
        }
    });
});

app.use('/upload', express.static('upload'));

app.listen(8000,()=>{
    console.log("Hellooo express......");
});