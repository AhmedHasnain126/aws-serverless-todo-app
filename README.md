# AWS Serverless To-Do Application

> A simple, fully serverless to-do list application built on Amazon Web Services. This project demonstrates a basic CRUD (Create, Read, Delete) application using a modern, event-driven architecture.
[**Live Demo**](http://your-bucket-name.s3-website-us-east-1.amazonaws.com)



## Final Architecture

The application is built entirely on serverless components, ensuring automatic scaling, high availability, and a pay-per-use cost model.

1.  **Frontend:** The static web application (HTML, CSS, JavaScript) is hosted on **Amazon S3**.
2.  **API:** **Amazon API Gateway (HTTP API)** provides the public endpoints for the frontend to interact with the backend.
3.  **Compute:** **AWS Lambda** functions (written in Node.js) contain the business logic for creating, reading, and deleting tasks.
4.  **Database:** **Amazon DynamoDB**, a NoSQL database, stores the to-do list items.



---

## Features

* **Create:** Add new tasks to the list.
* **Read:** View all existing tasks upon page load.
* **Delete:** Remove tasks by clicking on them.
* Fully responsive design for desktop and mobile.

---

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend:** AWS Lambda (Node.js 22)
* **API:** Amazon API Gateway (HTTP API)
* **Database:** Amazon DynamoDB
* **Hosting:** Amazon S3 (Static Website Hosting)
* **Security:** AWS IAM (Identity and Access Management)
* **Monitoring:** Amazon CloudWatch Logs

---

## Getting Started

To deploy this project in your own AWS account, follow the steps below.

### Prerequisites

* An AWS Account
* Git installed on your local machine
* Node.js and npm installed

### Backend Setup

1.  **DynamoDB Table:** Create a new DynamoDB table named `Tasks` with a Partition Key of `taskId` (String).
2.  **IAM Role:** Create an IAM Role for your Lambda functions with the following permissions:
    * `AWSLambdaBasicExecutionRole` (for CloudWatch logs)
    * A custom inline policy allowing `dynamodb:PutItem`, `dynamodb:Scan`, and `dynamodb:DeleteItem` on the `Tasks` table.
3.  **Lambda Functions:** Create three Lambda functions (`addTask`, `getTasks`, `deleteTask`) using the Node.js 22 runtime. Upload the code from the `backend/` directory to the corresponding function and attach the IAM role you created. Set an environment variable on each function: `TABLE_NAME` = `Tasks`.
4.  **API Gateway:** Create a single **HTTP API**.
    * Create three routes:
        * `POST /addTask`
        * `GET /getTasks`
        * `DELETE /task/{taskId}`
    * Create integrations to link each route to its corresponding Lambda function.
    * Configure **CORS** to allow requests from your S3 website URL (or `*` for testing).
    * Note the **Invoke URL** after deployment.

### Frontend Setup

1.  **S3 Bucket:** Create an S3 bucket.
    * Enable **Static website hosting** and set the index document to `index.html`.
    * **Unblock** all public access.
    * Add a **Bucket Policy** to allow `s3:GetObject` for all objects.
2.  **Configuration:** In the `frontend/` directory, create a file named `config.js`. This file is listed in `.gitignore` and will not be committed to source control. Add your API Gateway Invoke URL to this file:
    ```javascript
    // frontend/config.js
    const API_URL = "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com";
    ```
3.  **Upload Files:** Upload all files from the `frontend/` directory to your S3 bucket.

---

## Usage

Once all services are deployed and configured, you can access the application by navigating to the **Bucket website endpoint** URL provided in the S3 console's "Static website hosting" section.

---

## Future Improvements

* **User Authentication:** Implement user sign-up and sign-in using **AWS Cognito**.
* **Update Functionality:** Add the ability to edit a task or mark it as complete.
* **Custom Domain:** Use **Amazon Route 53** to host the application on a custom domain name.
* **Infrastructure as Code (IaC):** Define the entire AWS architecture in a template file using **AWS SAM** or **Terraform** for automated deployment.

---

## License

This project is licensed under the MIT License.