import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TABLE = process.env.TABLE_NAME || "Tasks";

export const handler = async () => {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type" 
  };

  try {
    const result = await dynamo.send(new ScanCommand({ TableName: TABLE }));
    const items = (result.Items || []).sort(
      (a, b) => (a.createdAt < b.createdAt ? 1 : -1)
    );

    return { statusCode: 200, headers, body: JSON.stringify(items) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
