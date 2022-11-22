# plotly-challenge

This challenge utilizes knowledge of Plotly and html code to produce a Belly Button Biodiversity Dashboard. There are 4 main components to this dashboard. The first is a dropdown menu. This menu allows you to select from the 153 different individuals. Each individual has metadata associated with them, which is displayed in a text box titled "Demographic Info". Each individual also has had data collected regarding the microbes that colonize their navels. A bar chart will display the top 10 microbial species (also referred to as OTUs in this study) that were present in the individual's navel. A bubble chart is also generated that displays every OTU present in the navel. 


Some changes were implemented into the html code for the javascript app to appropriately work. The bonus.js script line that was initially present was removed to remove the error from the console. On line 26, ' onchange="optionChanged(this.value)" ' was removed. This prevented an error where app.js would not be able to handle the new menu selection. 


In regards to deployment, Github Pages is defaulting to this README file. By simply adding " index.html" to the end of the launch page, one can then see the deployment and see the working dashboard.
