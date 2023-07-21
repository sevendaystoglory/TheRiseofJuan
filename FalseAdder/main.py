import openai
import json

openai.api_key = "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"
from my_functions import get_current_weather,adder

memory= []
user_history = []
assistant_history = []

def run_conversation():
    print("memory: ", memory)
    # Step 1: send the conversation and available functions to 
    content = input("User: ")
    messages = [{"role": "user", "content": content}]
    user_history.append(messages[-1])
    memory.append(messages[-1])
    functions = [
        {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                "required": ["location"],
            },
        },
        {
            "name": "adder",
            "description": "Add two numbers",
            "parameters": {
                "type": "object",
                "properties": {
                    "a": {
                        "type": "number",
                        "description": "First number to be added",
                    },
                    "b":{
                        "type": "number",
                        "description": "Second number to be added",
                    },
                },
                "required": ["a","b"],
            },
        }
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613",
        messages=memory,
        functions=functions,
        function_call="auto", # auto is default, but we'll be explicit
    )
    response_message = response["choices"][0]["message"]
    response_content = response['choices'][0]['message']['content']
    if response_content:
        memory.append({
            "role": "assistant",
            "content": response_content,

        }
        )  # extend conversation with assistant's reply
    print("Ai response: ", response_message)
    assistant_history.append({
        "role": "assistant",
        "content": response_content,
    }
    )
    
    # Step 2: check if GPT wanted to call a function ###########################
    if response_message.get("function_call"):
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        available_functions = {
            "get_current_weather": get_current_weather,
            "adder": adder
        }  # only one function in this example, but you can have multiple
        function_name = response_message["function_call"]["name"]
        print ("LODA", response_message)
        fuction_to_call = available_functions[function_name]
        function_args = json.loads(response_message["function_call"]["arguments"])
        if fuction_to_call==get_current_weather:
            function_response = fuction_to_call(
            location=function_args.get("location"),
            unit=function_args.get("unit"),
            )
        elif fuction_to_call==adder:
            function_response = fuction_to_call(
            a=function_args.get("a"),
            b=function_args.get("b"),
            )

        # Step 4: send the info on the function call and function response to GPT
        memory.append(
            {
                "role": "function",
                "name": function_name,
                "content": function_response,
            }
        )  
        
        # extend conversation with function 
        print(memory)
        second_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=memory,
        )  # get a new response from GPT where it can see the function response
        print ("Function Response: ",second_response)

while True:
    run_conversation()