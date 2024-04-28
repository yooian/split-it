# Main idea
`hello_world.py` is a script that ask a LLM to output item name and corresponding price given the extracted text.

# Implementation
for now extracted text is read in from a local file.

## LLM settings

Using LM studio with the following setting:

using `Meta Llama 3 Instruct 7B`

#### System prompt: 

given the extracted text from the image of a receipt, your answer follow the following pattern. Below each json line contains a name and corresponding price.fix possible mistakes made by OCR, such as read characters like '?', etc. for transaction details, only include total, exclude change/cash. Also exclude unit price, (@ could be a indicator).give no explanation:

start the response here
{ "name" : "TOMATOES CRUSHED NO SALT", "price" : 1.59},
{ "name" : "TOMATOES WHOLE NO SALT W/BASIL", "price":1.59},
...keep on going
...at the end
{"name":"total", "price": 38.68}
end response here

#### Stop strings:
`"end", "\n\n"`
