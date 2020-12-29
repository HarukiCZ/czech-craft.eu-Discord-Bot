const Discord = require("discord.js"); // Require discord.js
const client = new Discord.Client(); // Discord.js Client (Bot)
const { prefix, token, server_slug } = require("./config.json");
var getJSON = require("get-json");
const ping = require("minecraft-server-util");

client.on("message", (msg) => {
    const args = msg.content.split(" ");
    const command = args.shift().toLowerCase();
    if (command === prefix + "vote") {
        if (!args[0]) {
            return msg.channel.send("**Použití:** v!vote minecraft_nick");
        }
        getJSON(`https://czech-craft.eu/api/server/${server_slug}/player/${args[0]}/`, function(error, response) {
            const d1 = new Date(response.next_vote);
            const d2 = new Date(new Date());
            if (d1 < d2) {
                const Embed = new Discord.MessageEmbed()
                    .setColor("0xffff00")
                    .setTitle("Můžeš hlasovat")
                    .setURL("")
                    .setAuthor(" ", ``, "")
                    .setThumbnail(`${client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })}`)
                    .setDescription(
                        `**Jméno hráče:** ${response.username}\n**počet hlasů hráče:** ${response.vote_count}\nHurá! vypadá to že můžeš hlasovat.\n**Pro hlasování klikni: ---> [ZDE](https://czech-craft.eu/server/vanilkacraft/vote/?user=${response.username}) <---**`
                    )
                    .setImage("")
                    .setTimestamp()
                    .setFooter("CzechCraft bot by .☕Pigmen36ᴰᵉᵛ☕.#6078", `${client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })}`);

                msg.channel.send(Embed);
            } else {
                const Embed = new Discord.MessageEmbed()
                    .setColor("0xffff00")
                    .setTitle("Nelze hlasovat!")
                    .setURL("")
                    .setAuthor(" ", ``, "")
                    .setDescription(
                        `**Jméno hráče:** ${response.username}\n**počet hlasů hráče:** ${response.vote_count}\n**Zkus to znovu až v:** \`${response.next_vote}\``
                    )
                    .setThumbnail(`${client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })}`)
                    .setTimestamp()
                    .setFooter("CzechCraft bot by .☕Pigmen36ᴰᵉᵛ☕.#6078", `${client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })}`);

                msg.channel.send(Embed);
            }
        });
    }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);