# AutoServe

Video Presentation Link:  https://youtu.be/kK7CflwR0E8

Script:
Hello,

My name is Sergio Perez.  As a soccer family, we rely on the fact that our vehicles have to be properly maintained as we travel back and forth from games.  And no, I am not the person calling you to let you know your extended warranty has expired but rather, letting you come to my site, where you will find products that you will actually use.  

Let me introduce AutoServe.  AutoServe is an Express framework site deployed to Amazon’s EC2’s web service, where you and your family can obtain a service contract that can be used at any service center that takes credit cards for services such as oil changes, brake pads, batteries and so on.  

Let’s take a look.  Here at AutoServe, we have made it easy to search for your vehicle with a government API that updates regularly to ensure that your vehicle's make, model and year can easily be searched for and cut off the usual middle man that makes prices higher.   

To search for your vehicle, simply click on the drop down menu of the Form under Make to search for the make of the vehicle.  In this case I will choose Honda.   API calls for the model, based on the make, are automatically made so you won’t have all the models in the world to search.  In this case, I will choose Pilot and then go on to choose 2021 for my vehicle year.  Let’s go ahead and click on Submit to send our vehicle information.   The JavaScript back end receives this formation and calls on the JSON products database to return all available products.

The page is dynamically updated with your vehicle information as well as 6 available products from 1 to 6 year terms.   We can also see a summary of the services included in your contract and highlight the different options you have.  Let’s go ahead and add the 1 year term to our cart by clicking the add to cart button.  Since I can get a 2 year term for only $50 more, I will go ahead and get back to shopping to make a better choice.  You can win or lose at soccer games, but don’t lose by overpaying for services you have to pay for anyways.  Purchase a contract from AutoServe.  
