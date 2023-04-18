import json
import boto3
import urllib3
from decimal import Decimal

# Create a DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table_name = 'nba_stats'  # Update with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # Fetch player information from the NBA API
    url = "https://nba-player-individual-stats.p.rapidapi.com/players"
    headers = {}
    http = urllib3.PoolManager()
    response = http.request('GET', url, headers=headers)
    data = response.data.decode('utf-8')
    
    # Parse the response and store players in DynamoDB
    players = json.loads(data)
    for player in json.loads(data):
        first_name = player.get('firstName')
        last_name = player.get('lastName')
        position = player.get('position')
        points = Decimal(str(player.get('careerPoints'))) if player.get('careerPoints') else None
        rebounds = Decimal(str(player.get('careerRebounds'))) if player.get('careerRebounds') else None
        assists = Decimal(str(player.get('carrerAssists'))) if player.get('carrerAssists') else None
        turnovers = Decimal(str(player.get('careerTurnovers'))) if player.get('careerTurnovers') else None
        percentageThree = Decimal(str(player.get('careerPercentageThree'))) if player.get('careerPercentageThree') else None
        percentageFreethrow = Decimal(str(player.get('careerPercentageFreethrow'))) if player.get('careerPercentageFreethrow') else None
        percentageFieldGoal = Decimal(str(player.get('careerPercentageFieldGoal'))) if player.get('careerPercentageFieldGoal') else None
        height = player.get('height') if player.get('height') else None
        headShotUrl = player.get('headShotUrl') if player.get('headShotUrl') else None
        
        if last_name is not None and points is not None and rebounds is not None and assists is not None and points > 8:
        
            # Create the full_name field as the partition key
            full_name = f"{first_name} {last_name}"
            full_name = full_name.replace(' ', '-')
            
            # Create an item to store in DynamoDB
            item = {
                'full_name': full_name,
                'position': position,
                'height': height,
                'points': points,
                'rebounds': rebounds,
                'assists': assists,
                'turnovers': turnovers,
                'percentageThree': percentageThree,
                'percentageFreethrow': percentageFreethrow,
                'percentageFieldGoal': percentageFieldGoal,
                'headShotUrl': headShotUrl
            }
            
            # Store the item in DynamoDB
            table.put_item(Item=item)
            
    # Return a response
    response = {
        'statusCode': 200,
        'body': 'Player information stored in DynamoDB successfully'
    }
    
    return response
