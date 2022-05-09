require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();

let prefix = ";";

const token = process.env.TOKEN;
client.login(token);

client.on('ready', () => {
    console.log("Connected!")

    client.user.setActivity(" ", {type: "PLAYING"})

});

client.on('message', (receivedMessage) => {
     // Prevent bot from responding to its own messages
    if (receivedMessage.author !== client.user)
    {
        if (receivedMessage.content.startsWith(prefix))
        {
            processCommand(receivedMessage);
        }
        else if (receivedMessage.content.toLowerCase() === "thanks derry" || receivedMessage.content.toLowerCase() === "thank you derry")
        {
            receivedMessage.channel.send("You're welcome!");
        }
    }
});

function processCommand(receivedMessage) {
    const fullCommand = receivedMessage.content.substr(1);    // Remove the prefix
    const splitCommand = fullCommand.split(" ");           // Split the message up in to pieces for each space
    const primaryCommand = splitCommand[0];                        // The first word directly after the prefix is the command
    const commandArguments = splitCommand.slice(1);                // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand);
    console.log("Arguments: " + commandArguments);                 // There may not be any arguments

    if (primaryCommand === "restart")
    {
        restart(receivedMessage);
    }
    else if (primaryCommand === "help")
    {
        helpCommand(receivedMessage);
    }
    else if (primaryCommand === "compliment")
    {
        giveCompliment(receivedMessage);
    }
    else if (primaryCommand === "clear")
    {
        clearChat(receivedMessage, commandArguments);
    }
    else if (primaryCommand === "ping")
    {
        ping(receivedMessage);
    }
    else if (primaryCommand === "8ball")
    {
        eight_ball(receivedMessage, commandArguments);
    }
    else if (primaryCommand === "attention")
    {
        need_attention(receivedMessage, commandArguments);
    }
    else if (primaryCommand === "annoy")
    {
        annoySomeone(receivedMessage, commandArguments);
    }
    else if (primaryCommand === "prefix")
    {
        setPrefix(receivedMessage, commandArguments);
    }
    else
    {
        receivedMessage.channel.send("What's that command lmao, type `" + prefix + "help` to get some help");
    }
}

function annoySomeone(receivedMessage, commandArguments) {
    const user = commandArguments[0];
    const amount = commandArguments[1];

    if (amount < 100)
    {
        if (amount !== "")
        {
            for (let i = 0; i < amount; i++)
            {
                receivedMessage.channel.send("Hi" + user);
            }
        }
        else
        {
            for (let i = 0; i < 5; i++)
            {
                receivedMessage.channel.send("Hi" + user);
            }
        }
    }
    else
    {
        receivedMessage.channel.send("Kleiner getal aub");
    }
}

function restart(receivedMessage) {
    receivedMessage.channel.send("I can't do that yet...");
}

function helpCommand(receivedMessage) {
    const possibleCommands = {
        "help": "Get help for all the commands",
        "clear [amount]":  "Clear [amount] messages",
        "ping": "ping the server",
        "8ball [question]": "Ask advice from the great and mighty 8ball!",
        "annoy [user][amount]": "Ping the user a certain amount of times",
        "compliment": "Get Derry to send you a compliment",
        "prefix": "Update prefix"
    };

    receivedMessage.channel.send("You need help huh? I guess you're in luck, here are the commands!");

    let output = "```";
    for (const command in possibleCommands)
    {
        output += command + " => " + possibleCommands[command] + "\n";
    }

    if (receivedMessage.author.id === "553355440428417045" || receivedMessage.author.id === "299970856275279873")
    {
        output += "attention [amount] => Get Derry to send you attention when you need it <3";
    }

    output += "```";

    receivedMessage.channel.send(output);
}

function giveCompliment(receivedMessage) {
    const compliments = [
        "You look beautiful today :)",
        "Looking gooddddd " + receivedMessage.author.toString(),
        "You're the best!",
        "Remember to love yourself! Whatever you think, you're pretty **af**",
        "Look into the mirror, and smile. See how beautiful you are and keep that thought.",
        "I love your outfit!",
        "You're very much appreciated.",
        "You do matter. Don't let anyone else let you think otherwise.",
        "You're more loved than you think :)",
        "No matter what, things will work out eventually.",
        "Be you. Always.",
        "Hey sunshine :)"
    ];

    const index = Math.floor(Math.random() * compliments.length - 1);
    receivedMessage.channel.send(compliments[index]);
}

function clearChat(receivedMessage, commandArguments) {
    const amount = arguments.join(' ')

    if (!amount)
    {
        receivedMessage.channel.send("Please fill in a number!");
    }
    else if (isNaN(amount))
    {
        receivedMessage.channel.send("That isn't a number dumbass");
    }
    else if (amount > 100)
    {
        receivedMessage.channel.send("The amount shouldn't be bigger than 100!");
    }
    else if (amount < 1)
    {
        receivedMessage.channel.send("The amount should be more than 1!");
    }
    else
    {
        receivedMessage.channel.messages.fetch({ limit: amount }).then(messages => {
            receivedMessage.channel.bulkDelete(messages);

            receivedMessage.channel.send(amount + " messages have been cleared!");
        })
    }
}

function ping(receivedMessage) {
    receivedMessage.channel.send("pong lmao");
}

function eight_ball(receivedMessage, commandArguments) {
    const reply = Math.floor(Math.random() * 4);
    let output = null;

    if (arguments === "")
    {
        output = "Please ask a question.";
    }
    else
    {
        switch (reply)
        {
            case 0:
                output = "Yes";
                break;

            case 1:
                output = "Maybe";
                break;

            case 2:
                output = "No";
                break;

            case 3:
                output = "Try again";
                break;
        }
    }

    receivedMessage.channel.send(output);
}

function need_attention(receivedMessage, commandArguments) {
    const amount = commandArguments;
    const love =  [
                    "Jasper loves you very much. Although he may not always show it, he loves you no matter what :)",
                    "Jasper will always love you.",
                    "Your boyfriend loves you to the E&J star and back",
                    "Jasper thinks you're the absolute best",
                    "Jasper wants you to know you're gorgeous :)",
                    "Your bf will always be by your side, even if you're 555 miles away",
                    "Jasper wants to marry you",
                    "He wants to have kids with you",
                    "Jasper badly wants to kiss you",
                    "Jasper wants to have chill days with you and watch movies all day and have sleepy kisses",
                    "Being with you is the best thing that ever happened to Jasper",
                    "You genuinely mean the world to him",
                    "He wants you to know how pretty you really are",
                    "You're perfect.",
                    "Thinking about you makes Jasper smile a damn lot",
                    "Jasper is so lucky to be dating you",
                    "Jasper can't stop thinking about you",
                    "You make him so happy",
                    "Jasper wants to cuddle with you",
                    "He never ever wants to be with anyone else but you",
                    "Jasper is actually so proud of you for who you are and what you've done so far",
                    "If he could, Jasper would be at your place 24/7",
                    "Jasper secretly always misses you.",
                    "He listens to music that reminds him of you when he misses you too much",
                    "You're on his mind 24/7"
                ];

    // amount.length because amount is []
    // [] (array) is considered an object, which is truthy
    // amount.length returns 0 if no amount is given
    // !! Don't interpret this as which number amount gives (amount.length will either be 0 or 1) !!
    if (amount.length !== 0)
    {
        for (let i = 0; i < amount; i++)
        {
            const index = Math.floor(Math.random() * love.length);
            receivedMessage.channel.send((i + 1) + ": " + love[index]);
        }
    }
    else
    {
        const index = Math.floor(Math.random() * love.length);
        receivedMessage.channel.send(love[index]);
    }
}

function setPrefix(receivedMessage, commandArguments) {
    prefix = commandArguments[0];
    receivedMessage.channel.send("Prefix updated! New prefix is now: **" + prefix + "**");
}