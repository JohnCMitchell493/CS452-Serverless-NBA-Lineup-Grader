import json
import boto3

def lambda_handler(event, context):
    # Create a DynamoDB client
    dynamodb = boto3.client('dynamodb')

    # Specify your DynamoDB table name
    table_name = 'nba_stats'

    # Define the primary key values for the items you want to get
    pg = event['queryStringParameters']['pg']
    sg = event['queryStringParameters']['sg']
    sf = event['queryStringParameters']['sf']
    pf = event['queryStringParameters']['pf']
    c = event['queryStringParameters']['c']
    
    try:
        # Use the DynamoDB client to perform a batch get operation
        response = dynamodb.batch_get_item(
            RequestItems={
                table_name: {
                    'Keys': [
                        {'full_name': {'S': pg}},
                        {'full_name': {'S': sg}},
                        {'full_name': {'S': sf}},
                        {'full_name': {'S': pf}},
                        {'full_name': {'S': c}}
                    ]
                }
            }
        )

        # Extract the items from the response
        items = response.get('Responses', {}).get(table_name)

        if items is not None:
            # If items exist, return them as the response body
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps(items)
            }
        else:
            # If items don't exist, return an appropriate response
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps('Items not found')
            }

    except Exception as e:
        # Handle any exceptions that occur during the DynamoDB operation
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps(str(e))
        }
