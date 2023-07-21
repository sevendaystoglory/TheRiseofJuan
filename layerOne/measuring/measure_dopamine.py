import json
import openai
from tools import set_temp, normalize
openai.api_key = "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"

def measure_dopamine(context):
    full_message = [{'role' : 'system' , 'content' : "Dopamine is a neurotransmitter in the brain that plays a significant role in reward, motivation, and mood. While it's challenging to directly measure dopamine's impact on an individual's text messages without a detailed psychological and neurological evaluation, we can infer its potential effects based on known functions of dopamine: Motivation and Engagement: High levels of dopamine are often associated with increased motivation and enthusiasm. This might translate to more frequent and engaged text messaging. A person might initiate conversations, respond quickly, and show enthusiasm in their responses. Positivity: Since dopamine is associated with reward and pleasure, higher dopamine levels might make a person more likely to use positive language and express joy or excitement in their text messages. Creativity: Dopamine is also linked to creativity. Higher levels might lead to more creative and unique messages, as well as a willingness to engage in deep and thought-provoking conversations. Risk-taking: Dopamine has been linked to risk-taking behavior. In the context of text messaging, this might mean being more open, saying things that the individual might usually hold back, or initiating conversations with new people. Keep in mind these are broad generalizations, and individual behavior can be influenced by many other factors, including other neurotransmitters, personal circumstances, cultural norms, and individual personality traits. Also, while we often associate dopamine with positive behaviors and feelings, extremely high levels can also contribute to impulsivity and addiction. Lastly, the effects of lower levels of dopamine can contrast with the effects of higher levels, potentially leading to decreased motivation, less frequent and engaged texting, and more negative or neutral language."},{'role':'user', 'content' : context},{'role':'user', 'content' : 'Predict the level of Dopamine in the system of this person, where level 0 means minimum intensity and level 100 denotes maximum intensity'}] 

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613",
        messages= full_message
    )

    return(response)
