from pymongo import MongoClient

client = MongoClient()
db=client['account_manager']

users=db['users']

items =db['items']
def new_user(user_params):
    user_id=users.insert(user_params)
    return user_id

def find_user(criteria):
    
    user= users.find_one(criteria)
    return user

def find_things(criteria):
    things=users.find(criteria)
    return things

def find_item(criteria):
    item= items.find(criteria)
    return item
def new_item(item_params):
    item= items.insert(item_params)
    return item


