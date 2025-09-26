import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TABLE = process.env.TABLE_NAME || "Tasks";

export const handler = async (event) => {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type" 
  };

  try {
    let taskId = null;

    if (event.pathParameters && event.pathParameters.taskId) {
      taskId = event.pathParameters.taskId;
    } else if (event.body) {
      const body = JSON.parse(event.body);
      taskId = body.taskId;
    }

    if (!taskId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "taskId required" }) };
    }

    await dynamo.send(new DeleteCommand({ TableName: TABLE, Key: { taskId } }));

    return { statusCode: 200, headers, body: JSON.stringify({ message: "Task deleted", taskId }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
