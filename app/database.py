import boto3
from app.config import AWS_REGION

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)

def get_table(table_name):
    return dynamodb.Table(table_name)
