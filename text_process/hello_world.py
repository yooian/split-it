import json

from openai import OpenAI

# Point to the local server
client = OpenAI(base_url="http://localhost:8001/v1", api_key="lm-studio")

# Open the file in read mode
with open("/Users/ziqiangzhu/split-it/image-process/myfile.txt", "r") as f:
    data = f.read()

completion = client.chat.completions.create(
  model="model-identifier",
  messages=[
    {"role": "user", "content": data}
  ],
  temperature=0.7,
)

response = completion.choices[0].message.content
response = str(response)

# with open('output.txt', 'w') as file:
#     # Write a string to the file
#     file.write(response)


# Read the text file
# with open('/Users/ziqiangzhu/split-it/output.txt', 'r') as file:
#     data = file.read()

# Clean up the text and format it as a JSON array
response = "[" + response.replace(",\n", "\n") + "]"
# print(data)

# Parse the JSON
json_data = json.loads(response)

# Print the JSON
print(json.dumps(json_data, indent=2))


