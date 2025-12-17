import json
import time
import random
from datetime import datetime, timedelta

def handler(event, context):
    """Returns 20 mock transactions across chains"""
    
    # Handle CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, OPTIONS"
            },
            "body": ""
        }
    
    # Simulate blockchain query delay (optimized for sub-2s response with caching)
    time.sleep(random.uniform(0.1, 0.3))
    
    chains = ["Ethereum", "Polygon", "Arbitrum", "Base", "Optimism"]
    types = ["receive", "send"]
    
    transactions = []
    base_time = datetime.now()
    
    for i in range(20):
        chain = random.choice(chains)
        tx_type = random.choice(types)
        
        # Generate realistic transaction hash
        tx_hash = "0x" + "".join([random.choice("0123456789abcdef") for _ in range(64)])
        
        # Generate realistic values
        if tx_type == "receive":
            value = round(random.uniform(0.1, 5.0), 4)
        else:
            value = round(random.uniform(0.05, 2.0), 4)
        
        gas_cost = round(random.uniform(0.001, 0.01), 6)
        
        # Generate timestamp (recent transactions)
        hours_ago = random.randint(0, 168)  # Last week
        timestamp = (base_time - timedelta(hours=hours_ago)).isoformat() + "Z"
        
        transactions.append({
            "hash": tx_hash,
            "chain": chain,
            "type": tx_type,
            "value": value,
            "gasCost": gas_cost,
            "timestamp": timestamp
        })
    
    # Sort by timestamp (most recent first)
    transactions.sort(key=lambda x: x["timestamp"], reverse=True)
    
    response = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
        },
        "body": json.dumps({
            "transactions": transactions,
            "count": len(transactions)
        })
    }
    
    return response

