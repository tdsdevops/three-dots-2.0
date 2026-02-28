import useAxios from '../../api/useAxios'
import { apiRoutes } from '../../appConstant'


export  const sendmail=async (values)=>{ 
    const response = await useAxios().post(
    apiRoutes.sendEmail,
    {
      email: "threedotssoftwaredevelopment@gmail.com",
      subject: values.service + " enquiry",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
            color: #333;
            text-align: left;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Customer Details</h2>
        <p>Hi,</p>
        <p>Here are the details of the customer:</p>

        <table>
            <tr>
                <th>Field</th>
                <th>Details</th>
            </tr>
            <tr>
                <td><strong>Name:</strong></td>
                <td>${values.name}</td>
            </tr>
            <tr>
                <td><strong>Email:</strong></td>
                <td>${values.email}</td>
            </tr>
            <tr>
                <td><strong>Services:</strong></td>
                <td>${values.service}</td>
            </tr>
            <tr>
                <td><strong>Message:</strong></td>
                <td>${values.message}</td>
            </tr>
        </table>

        <p>If you have any questions, feel free to reach out to us.</p>
        
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
    },
    {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmamFmeWZxaHBqaHZkdWZ2c2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODQzMjAsImV4cCI6MjA2MTc2MDMyMH0.NoFMFHaISumh_6CrKN6rYv2HRh7c6bWHMtd3ake90TU" 
      ,"Content-Type": "application/json",
    },
    }
  )}