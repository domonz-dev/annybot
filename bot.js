const Discord = require("discord.js");
const bot = new Discord.Client();
const Canvas = require("canvas");
const db = require("quick.db");

const invites = {};

const randomPuppy = require("random-puppy");
const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  let fontSize = 40;

  do {
    ctx.font = `bold ${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);
  return ctx.font;
};

const prefix = ".";
bot.login(process.env.TOKEN); //NjUzNjEzMTk2NDkzNTg2NDUy.Xr4EZg.TDNH6KVAAYSQPGZ7dR0qr8DIchc

bot.on("ready", () => {
  console.log("i am ready");
  console.log(`servers : ${bot.guilds.size}`);
  bot.user.setActivity(`with .help`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////

bot.on("message", async message => {
  if (message.content == `${prefix}test`) {
    db.fetch(`${message.guild.id}_welcomer`).then(rr => {
      if (rr == 0) return message.channel.send("Welcomer is not enabled");

      db.fetch(`${message.guild.id}_canText`).then(async r => {
        db.fetch(`${message.guild.id}_canImage`).then(async s => {
          db.fetch(`${message.guild.id}_bcolor`).then(async bcolor => {
            db.fetch(`${message.guild.id}_profborder`).then(async profb => {
              db.fetch(`${message.guild.id}_welText`).then(async welText => {
                db.fetch(`${message.guild.id}_welColor`).then(
                  async welColor => {
                    db.fetch(`${message.guild.id}_nameColor`).then(
                      async nameColor => {
                        db.fetch(`${message.guild.id}_desColor`).then(
                          async desColor => {
                            db.fetch(`${message.guild.id}_embedColor`).then(
                              async ec => {
                                if (r == null) {
                                  r =
                                    "Thanks for join us have a great time here";
                                }
                                if (s == null) {
                                  s =
                                    "https://cdn.discordapp.com/attachments/636243556738007060/687613448774877225/Untitled-2.jpg";
                                }
                                if (bcolor == null) {
                                  bcolor = "WHITE";
                                }
                                if (profb == null) {
                                  profb = "RED";
                                }
                                if (welText == null) {
                                  welText = "Welcome";
                                }
                                if (welColor == null) {
                                  welColor = "WHITE";
                                }
                                if (ec == null) {
                                  ec = "GREEN";
                                }
                                if (nameColor == null) {
                                  nameColor = "WHITE";
                                }
                                if (desColor == null) {
                                  desColor = "WHITE";
                                }

                                const canvas = Canvas.createCanvas(1000, 400);
                                const ctx = canvas.getContext("2d");

                                const background = await Canvas.loadImage(s);
                                ctx.drawImage(
                                  background,
                                  0,
                                  0,
                                  canvas.width,
                                  canvas.height
                                );

                                ctx.strokeStyle = bcolor;
                                ctx.lineWidth = 15;
                                ctx.strokeRect(
                                  0,
                                  0,
                                  canvas.width,
                                  canvas.height
                                );

                                // Slightly smaller text placed above the member's display name
                                ctx.font = "bold 35px sans-serif";
                                ctx.fillStyle = welColor;
                                ctx.textBaseline = "middle";
                                ctx.textAlign = "center";
                                ctx.fillText(
                                  welText,
                                  canvas.width / 2.0,
                                  canvas.height / 1.5
                                );

                                // Add an exclamation point here and below
                                ctx.font = applyText(
                                  canvas,
                                  `${message.author.tag}`
                                );
                                ctx.fillStyle = nameColor;
                                ctx.textBaseline = "middle";
                                ctx.textAlign = "center";
                                ctx.fillText(
                                  `${message.author.tag}`,
                                  canvas.width / 2.0,
                                  canvas.height / 1.25
                                );

                                ctx.font = "bold 35px sans-serif";
                                ctx.fillStyle = desColor;
                                ctx.textBaseline = "middle";
                                ctx.textAlign = "center";
                                ctx.fillText(
                                  r
                                    .replace("{server}", message.guild.name)
                                    .replace(
                                      "{members}",
                                      message.guild.memberCount
                                    ),
                                  canvas.width / 2.0,
                                  canvas.height / 1.1
                                );

                                ctx.beginPath();
                                ctx.strokeStyle = profb;
                                ctx.lineWidth = 25;
                                ctx.shadowBlur = 20;
                                ctx.shadowColor = "black";
                                ctx.fillRect(
                                  canvas.width / 2 - 1,
                                  125,
                                  100,
                                  0,
                                  Math.PI * 2,
                                  true
                                );
                                ctx.arc(
                                  canvas.width / 2 - 1,
                                  125,
                                  100,
                                  0,
                                  Math.PI * 2,
                                  true
                                );
                                ctx.stroke();
                                ctx.fill();
                                ctx.beginPath();

                                ctx.beginPath();
                                ctx.strokeStyle = "Black";
                                ctx.lineWidth = 15;
                                ctx.arc(
                                  canvas.width / 2 - 1,
                                  125,
                                  100,
                                  0,
                                  Math.PI * 2,
                                  true
                                );
                                ctx.stroke();
                                ctx.fill();
                                ctx.beginPath();

                                ctx.beginPath();
                                ctx.arc(
                                  canvas.width / 2 - 1,
                                  125,
                                  100,
                                  0,
                                  Math.PI * 2,
                                  true
                                );
                                ctx.closePath();
                                ctx.clip();

                                const avatar = await Canvas.loadImage(
                                  message.author.displayAvatarURL
                                );
                                ctx.drawImage(
                                  avatar,
                                  canvas.width / 2 - 200 / 2,
                                  25,
                                  200,
                                  200
                                );

                                const attachment = new Discord.Attachment(
                                  canvas.toBuffer(),
                                  "img.jpg"
                                );

                                const embed = new Discord.RichEmbed()
                                  .setAuthor(
                                    message.author.tag,
                                    message.author.displayAvatarURL
                                  )
                                  .setDescription("Test")
                                  .setColor(ec)
                                  .setImage("attachment://img.jpg"); // Remove this line to show the attachment separately.

                                message.channel
                                  .send({ embed, files: [attachment] })
                                  .catch(err => {
                                    console.log("error from test part");
                                  });
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////

bot.on("message", message => {
  if (message.author.bot) return;

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".setChannel")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        "You didn't mentioned a channel use `.setChannel #channel`"
      );

    let newChannel = channel.id;

    db.set(`${message.guild.id}_welChannel`, newChannel).then(i => {
      message.channel
        .send(
          `**Successfully updated welcome channel to ${message.mentions.channels.first()}**`
        )
        .catch(error => {
          console.log("Error Caught");
        });
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".setMsg")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");
    let msg = message.content.slice(".setmsg".length);
    db.set(`${message.guild.id}_joinMessage`, msg).then(i => {
      message.channel.send("`Successfully updated welcome message`");
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".desText")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");
    let msg = message.content.slice(".desText".length);
    db.set(`${message.guild.id}_canText`, msg).then(r => {
      message.channel.send("**Successfully Updated Description Text  **");
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".setImg")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    var Attachment = message.attachments.array();
    let img = Attachment[0].url;
    db.set(`${message.guild.id}_canImage`, img).then(r => {
      message.channel.send("Successfilly Updated Welcome Image");
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".imgStroke")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let bcolor = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    db.set(`${message.guild.id}_bcolor`, bcolor).then(r => {
      message.channel.send(
        "**Updated Image Border Line Color to **`" + bcolor + "`"
      );
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".profStroke")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let pcolor = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    db.set(`${message.guild.id}_profborder`, pcolor).then(r => {
      message.channel.send(
        "**Updated profile Border Line Color To **`" + pcolor + "`"
      );
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".welText")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let welText = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    db.set(`${message.guild.id}_welText`, welText).then(r => {
      message.channel.send("**Updated Welcome Text To **`" + welText + "`");
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".welColor")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let welColor = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    db.set(`${message.guild.id}_welColor`, welColor).then(r => {
      message.channel.send(
        "**Updated Welcome Text Color To **`" + welColor + "`"
      );
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".nameColor")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let nameColor = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    db.set(`${message.guild.id}_nameColor`, nameColor).then(r => {
      message.channel.send("**Updated Name Color To **`" + nameColor + "`");
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".desColor")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let desColor = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    db.set(`${message.guild.id}_desColor`, desColor).then(r => {
      message.channel.send(
        "**Updated Description Color To **`" + desColor + "`"
      );
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".embedColor")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let ec = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    db.set(`${message.guild.id}_embedColor`, ec).then(r => {
      message.channel.send("**Updated Embed Color To **`" + ec + "`");
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".welcomer")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");

    let msg = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (msg == "enable") {
      db.set(`${message.guild.id}_welcomer`, 1);
      return message.channel.send("**Welcomer is now `enabled`**");
    }
    if (msg == "disable") {
      db.set(`${message.guild.id}_welcomer`, 0);
      return message.channel.send("**Welcomer is now `disabled`**");
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".reset")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Permission Needed : `MANAGE_CHANNELS`**");
    db.set(`${message.guild.id}_canText`, null);
    db.set(`${message.guild.id}_canImage`, null);
    db.set(`${message.guild.id}_bcolor`, null);
    db.set(`${message.guild.id}_profborder`, null);
    db.set(`${message.guild.id}_welText`, null);
    db.set(`${message.guild.id}_welColor`, null);
    db.set(`${message.guild.id}_nameColor`, null);
    db.set(`${message.guild.id}_desColor`, null);

    return message.channel.send(
      "**All values for welcome image has been reseted successfully**"
    );
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".leaveChannel")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("Permission Error : `MANAGE_CHANNELS`");
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel
        .send("**please mention a channel first**")
        .then(r => r.delete(5000));
    let ID = channel.id;

    db.set(`leaveChannel_${message.guild.id}`, ID);

    message.channel.send(
      "**Successfully updated leave channel to** " + channel
    );
  }
  if (message.content.startsWith(".leaveMsg")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("Permission Error : `MANAGE_CHANNELS`");

    let msg = message.content.slice("s.leaveMsg ".length);
    if (!msg)
      return message.channel
        .send(
          "**please specify a leave message or check command uses by command `s.help leavemsg`**"
        )
        .then(r => r.delete(1000));

    db.set(`leaveMsg_${message.guild.id}`, msg);

    return message.channel.send("**Successfully updated leave message**");
  }

  if (message.content == `${prefix}help`) {
    let embed = new Discord.RichEmbed()
      .setTitle("Help Menu")
      .setThumbnail(bot.user.iconURL)
      .setColor("RANDOM")
      .setDescription(
        "**Bot Prefix Is `.` Here is some commands for setup welcome image and test we provide everything into it you can edit everything....\nto Enable/Disable Welcomer use `.welcomer enable/disable`**\n\nWelcomer_Commands:\n`setChannel`, `setMsg`,`setImg`, `desText`, `welText`, `welColor`, `nameColor`,\n`desColor`, `profStroke`, `imgStroke`, `reset` , `test` , `embedColor`\n\nWelcomer2:\n`w2channel`, `w2role`, `w2msg`\n\nLeave Commands:\n`leaveChannel`, `leaveMsg`\n\nOthers :\n`.meme`\n`.fb <msg> <Attach Image>`"
      )
      .addField(
        "**Intructions :**",
        "**To see info of each eommands use `.help <command name>` to know that command easily**"
      )
      .addField(
        "**Invite Me :**",
        "[Invite](https://top.gg/bot/653613196493586452)",
        true
      )
      .addField(
        "**Join Server :**",
        "[Join Here](https://discord.gg/pftGXAP)",
        true
      )
      .addField(
        "**See Tutorial :**",
        "[Click Here](https://www.youtube.com/watch?v=aISfv8E-xzA)"
      );
    message.channel.send(embed);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".help")) {
    let cmd = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (cmd == "setChannel") {
      let embed = new Discord.RichEmbed()
        .setTitle("Set a channel")
        .setDescription(
          "`.setChannel #channel`  [set welcome channel to #channel]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "setMsg") {
      let embed = new Discord.RichEmbed()
        .setTitle("Welcome Message")
        .setDescription(
          "`.setMsg <msg>`  \n\nDocumentation : \n\n`{user}` - tag user\n`{server}` - server name\n`{members}` - member count"
        );
      return message.channel.send(embed);
    }
    if (cmd == "desColor") {
      let embed = new Discord.RichEmbed()
        .setTitle("Description Text Color")
        .setDescription(
          "`.desColor <ColorName>`  [ColorName should be in Caps Ex. `.desColor RED`]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "desText") {
      let embed = new Discord.RichEmbed()
        .setTitle("Description Text")
        .setDescription(
          "`.desText <msg>`  \n\nSet Description Text [Documentation] :\n\n`{server}` - for server name\n`{members} - for member count"
        );
      return message.channel.send(embed);
    }
    if (cmd == "welText") {
      let embed = new Discord.RichEmbed()
        .setTitle("Welcome Text")
        .setDescription("`.welText <msg>`  [Edit welcome text in image]");
      return message.channel.send(embed);
    }
    if (cmd == "welColor") {
      let embed = new Discord.RichEmbed()
        .setTitle("Welcome Text Color")
        .setDescription(
          "`.welColor <ColorName>`  [set welcome text color[In Caps] Ex. `.welColor RED`]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "nameColor") {
      let embed = new Discord.RichEmbed()
        .setTitle("User Name Color")
        .setDescription(
          "`.nameColor <ColorName>`  [set color of member name tag Ex. `.setColor BLUE`]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "imgStroke") {
      let embed = new Discord.RichEmbed()
        .setTitle("Image Border Color")
        .setDescription(
          "`.imgStroke`  [set border/stroke color of canvas image Ex. `.imgStroke RED`]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "profStroke") {
      let embed = new Discord.RichEmbed()
        .setTitle("Profile Border Color")
        .setDescription(
          "`.profStroke`  [set border/stroke color of profile image Ex. `.profStroke RED`]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "reset") {
      let embed = new Discord.RichEmbed()
        .setTitle("Reset Everything")
        .setDescription(
          "`.reset`  [reset every edit which you did with welcome image]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "w2channel") {
      let embed = new Discord.RichEmbed()
        .setTitle("welcomer_2 channel")
        .setDescription(
          "`.w2channel #channel`  [set `#chaneel` as welcomer_2]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "w2role") {
      let embed = new Discord.RichEmbed()
        .setTitle("Welcomer_2 Role")
        .setDescription(
          "`.w2role @role`  [set `@role` as the new joiner role]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "w2msg") {
      let embed = new Discord.RichEmbed()
        .setTitle("Welcomer_2 Message")
        .setDescription(
          "`.w2msg <message>`  \n\n\nDocumentation : \n\n`{user}` - tag user\n`{server}` - server name\n`{members}` - member count"
        );
      return message.channel.send(embed);
    }
    if (cmd == "setImg") {
      let embed = new Discord.RichEmbed()
        .setTitle("Set Background Image")
        .setDescription(
          "`.setImg <attach an image>`  [Attach an image to set as background]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "embedColor") {
      let embed = new Discord.RichEmbed()
        .setTitle("Set Embed Color")
        .setDescription(
          "`.embedColor <Color>`  [Put hex code to change embed color]"
        );
      return message.channel.send(embed);
    }
    if (cmd == "leaveChannel")
      return message.channel.send({
        embed: {
          color: 3447003,
          title: "leaveChannel uses",
          description:
            "Ex - `.leaveChannel #channel`    [Setup a leave channel and to change leave message use `.help leaveMsg` to see leavemessage uses]"
        }
      });
    if (cmd == "leavemsg")
      return message.channel.send({
        embed: {
          color: 3447003,
          title: "leaveMsg uses",
          description:
            "Ex - `.leaveMsg <message>`\nSetup leave message using documentation -\n`{user}` - To mention a member who left the server\n`{members}` - To show server member count"
        }
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".meme")) {
    let reddit = [
      "meme",
      "animemes",
      "MemesOfAnime",
      "animememes",
      "AnimeFunny",
      "dankmemes",
      "dankmeme",
      "wholesomememes",
      "MemeEconomy",
      "techsupportanimals",
      "meirl",
      "me_irl",
      "2meirl4meirl",
      "AdviceAnimals"
    ];

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit)
      .then(async url => {
        let embed = new Discord.RichEmbed()
          .setImage(url)
          .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL}`
          )
          .setColor("RANDOM")
          .setFooter("Requested by : " + message.author.tag);
        await message.channel
          .send(embed)
          .then(() => message.channel.stopTyping());
        console.log(url);
      })
      .catch(err => console.error(err));
  }
});
bot.on("message", async message => {
  if (message.content.startsWith(".fb")) {
    let msg = message.content.slice(".fb ".length);
    if (!msg)
      return message.channel.send(
        "Add some message Format : `.fb <msg> <image>`"
      );
    var Attachment = message.attachments.array();
    if (!Attachment)
      return message.channel.send(
        "Add a image first Format : `.fb <msg> <image>`"
      );

    let like = Math.floor(Math.random() * (500 - 99 + 1)) + 99;
    let cmnts = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    let today = new Date();
    let months = [
      `Jan`,
      `Feb`,
      `March`,
      `April`,
      `May`,
      `Junn`,
      `July`,
      `Aug`,
      `Sept`,
      `Oct`,
      `Nov`,
      `Dec`
    ];
    let date = `${today.getDate()} ${months[today.getMonth()]} 2020`;
    const canvas = Canvas.createCanvas(1096, 1220);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/683201747895844864/688350770709790831/IMG_20200314_170915.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name snekfetch

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "BLACK";
    ctx.fillText(msg, canvas.width / 40, canvas.height / 6);

    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.rect(0, 345, 1096, 700);
    ctx.stroke();
    ctx.closePath();

    const atc = await Canvas.loadImage(Attachment[0].url);
    ctx.drawImage(atc, 0, 345, 1096, 700);
    ctx.closePath();

    ctx.font = "28px arial";
    ctx.fillStyle = "BLACK";
    ctx.fillText(`${like}k`, canvas.width / 9.9, canvas.height / 1.11);

    ctx.font = "28px arial";
    ctx.fillStyle = "BLACK";
    ctx.fillText(
      `${cmnts}k Comments`,
      canvas.width / 1.25,
      canvas.height / 1.11
    );

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "light black";
    ctx.fillText(date, canvas.width / 9, canvas.height / 13);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${message.author.displayName}!`);
    ctx.fillStyle = "Black";
    ctx.fillText(
      `${message.author.username}!`,
      canvas.width / 9,
      canvas.height / 19
    );

    ctx.beginPath();
    ctx.arc(64.5, 67, 44, 0, Math.PI * 2, true);
    ctx.strokeStyle = "BLACK";
    ctx.lineWidth = "3";
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL);
    ctx.drawImage(avatar, 15, 20, 100, 100);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );

    message.channel.send(attachment);
  }
});

bot.on("guildMemberAdd", async member => {
  db.fetch(`${member.guild.id}_welcomer`).then(rr => {
    if (rr == 0) return;

    db.fetch(`${member.guild.id}_canText`).then(async r => {
      db.fetch(`${member.guild.id}_canImage`).then(async s => {
        db.fetch(`${member.guild.id}_bcolor`).then(async bcolor => {
          db.fetch(`${member.guild.id}_profborder`).then(async profb => {
            db.fetch(`${member.guild.id}_welText`).then(async welText => {
              db.fetch(`${member.guild.id}_welColor`).then(async welColor => {
                db.fetch(`${member.guild.id}_nameColor`).then(
                  async nameColor => {
                    db.fetch(`${member.guild.id}_desColor`).then(
                      async desColor => {
                        db.fetch(`${member.guild.id}_embedColor`).then(
                          async ec => {
                            if (ec == null) {
                              ec = "Black";
                            }
                            if (r == null) {
                              r = "Thanks for join us have a great time here";
                            }
                            if (s == null) {
                              s =
                                "https://cdn.discordapp.com/attachments/636243556738007060/687613448774877225/Untitled-2.jpg";
                            }
                            if (bcolor == null) {
                              bcolor = "WHITE";
                            }
                            if (profb == null) {
                              profb = "RED";
                            }
                            if (welText == null) {
                              welText = "Welcome";
                            }
                            if (welColor == null) {
                              welColor = "WHITE";
                            }
                            if (nameColor == null) {
                              nameColor = "WHITE";
                            }
                            if (desColor == null) {
                              desColor = "WHITE";
                            }

                            const canvas = Canvas.createCanvas(1000, 400);
                            const ctx = canvas.getContext("2d");

                            const background = await Canvas.loadImage(s);
                            ctx.drawImage(
                              background,
                              0,
                              0,
                              canvas.width,
                              canvas.height
                            );

                            ctx.strokeStyle = bcolor;
                            ctx.lineWidth = 15;
                            ctx.strokeRect(0, 0, canvas.width, canvas.height);

                            // Slightly smaller text placed above the member's display name
                            ctx.font = "bold 35px sans-serif";
                            ctx.fillStyle = welColor;
                            ctx.textBaseline = "middle";
                            ctx.textAlign = "center";
                            ctx.fillText(
                              welText,
                              canvas.width / 2.0,
                              canvas.height / 1.5
                            );

                            // Add an exclamation point here and below
                            ctx.font = applyText(canvas, `${member.user.tag}`);
                            ctx.fillStyle = nameColor;
                            ctx.textBaseline = "middle";
                            ctx.textAlign = "center";
                            ctx.fillText(
                              `${member.user.tag}`,
                              canvas.width / 2.0,
                              canvas.height / 1.25
                            );

                            ctx.font = "bold 35px sans-serif";
                            ctx.fillStyle = desColor;
                            ctx.textBaseline = "middle";
                            ctx.textAlign = "center";
                            ctx.fillText(
                              r
                                .replace("{server}", member.guild.name)
                                .replace("{members}", member.guild.memberCount),
                              canvas.width / 2.0,
                              canvas.height / 1.1
                            );

                            ctx.beginPath();
                            ctx.strokeStyle = profb;
                            ctx.lineWidth = 25;
                            ctx.shadowBlur = 20;
                            ctx.shadowColor = "black";
                            ctx.fillRect(
                              canvas.width / 2 - 1,
                              125,
                              100,
                              0,
                              Math.PI * 2,
                              true
                            );
                            ctx.arc(
                              canvas.width / 2 - 1,
                              125,
                              100,
                              0,
                              Math.PI * 2,
                              true
                            );
                            ctx.stroke();
                            ctx.fill();
                            ctx.beginPath();

                            ctx.beginPath();
                            ctx.strokeStyle = "Black";
                            ctx.lineWidth = 15;
                            ctx.arc(
                              canvas.width / 2 - 1,
                              125,
                              100,
                              0,
                              Math.PI * 2,
                              true
                            );
                            ctx.stroke();
                            ctx.fill();
                            ctx.beginPath();

                            ctx.beginPath();
                            ctx.arc(
                              canvas.width / 2 - 1,
                              125,
                              100,
                              0,
                              Math.PI * 2,
                              true
                            );
                            ctx.closePath();
                            ctx.clip();

                            const avatar = await Canvas.loadImage(
                              member.user.displayAvatarURL
                            );
                            ctx.drawImage(
                              avatar,
                              canvas.width / 2 - 200 / 2,
                              25,
                              200,
                              200
                            );

                            const atc = new Discord.Attachment(
                              canvas.toBuffer(),
                              "img.jpg"
                            );

                            db.fetch(`${member.guild.id}_joinMessage`).then(
                              p => {
                                if (p == null) {
                                  p = "";
                                }
                                db.fetch(`${member.guild.id}_welChannel`).then(
                                  i => {
                                    if (i == null || i == undefined) return;

                                    const embed = new Discord.RichEmbed()
                                      .setAuthor(
                                        member.user.tag,
                                        member.user.displayAvatarURL
                                      )
                                      .setDescription(
                                        "**" +
                                          p
                                            .replace("{user}", member)
                                            .replace(
                                              "{server}",
                                              member.guild.name
                                            )
                                            .replace(
                                              "{members}",
                                              member.guild.memberCount
                                            ) +
                                          "**"
                                      )
                                      .setColor(ec)
                                      .setImage("attachment://img.jpg");

                                    let channel = member.guild.channels.get(i);
                                    if(channel == undefined) return;
                                    channel
                                      .send({ embed, files: [atc] })
                                      .catch(error => {
                                        console.log("Error from Canvas Part From "+member.guild.name);
                                      });
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});

bot.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(".w2channel")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("Permission Error : `MANAGE_CHANNELS`");
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send("You forget to mention a channel");
    db.set(`welcome2ch_${message.guild.id}`, channel.id);

    return message.channel.send("Updated welcome channel");
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".w2role")) {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.send("Permission Error : `MANAGE_ROLES`");
    let role = message.mentions.roles.first();
    if (!role) return message.channel.send("You forget to mention a role");
    db.set(`welcome2role_${message.guild.id}`, role.id);

    return message.channel.send("Updated welcome role to `" + role.name + "`");
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (message.content.startsWith(".w2msg")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("Permission Error : `MANAGE_CHANNELS`");
    let msg = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!msg) return message.channel.send("Nothing Provided for welcome Text");
    db.set(`welcome2msg_${message.guild.id}`, msg);

    return message.channel.send("Updated welcome message");
  }
});

bot.on("guildMemberAdd", member => {
  db.fetch(`welcome2ch_${member.guild.id}`).then(channel => {
    db.fetch(`welcome2role_${member.guild.id}`).then(role => {
      db.fetch(`welcome2msg_${member.guild.id}`).then(welmsg => {
        if (channel == null) return;
        let i = 0;
        if (!welmsg) {
          welmsg = "welcome " + member + " to our server";
        }
        let ch = member.guild.channels.get(channel);
        if (ch == null || channel == undefined) return;
        ch.send("**Incoming new member...**").then(r =>
          r.delete(3000).then(w => {
            ch.send("**Loading...**").then(msg => {
              setInterval(async function() {
                i++;
                if (i == 1) {
                  msg.edit("◔ **10%** \n▰▱▱▱▱▱▱▱▱▱");
                }
                if (i == 2) {
                  msg.edit("◐ **30%** \n▰▰▰▱▱▱▱▱▱▱");
                }
                if (i == 3) {
                  msg.edit("◕ **50%** \n▰▰▰▰▰▱▱▱▱▱");
                }
                if (i == 4) {
                  msg.edit("⬤ **70%** \n▰▰▰▰▰▰▰▱▱▱");
                }
                if (i == 5) {
                  msg.edit("◔ **80%** \n▰▰▰▰▰▰▰▰▱▱");
                }
                if (i == 6) {
                  msg.edit("◐ **90%** \n▰▰▰▰▰▰▰▰▰▱");
                }
                if (i == 7) {
                  msg.edit("◕ **100%** \n▰▰▰▰▰▰▰▰▰▰");
                }
                if (i == 8) {
                  msg.edit(
                    welmsg
                      .replace("{user}", member)
                      .replace("{server}", member.guild.name)
                      .replace("{members}", member.guild.memberCount)
                  );
                  msg.delete(90000)
                  if (role == null || role == undefined) return;
                  await member.addRole(role);
                }
                if (i == 9) {
                  return;
                }
              }, 1500);
            });
          })
        );
      });
    });
  });
});
bot.on("guildMemberRemove", member => {
  db.fetch(`leaveChannel_${member.guild.id}`).then(r => {
    db.fetch(`leaveMsg_${member.guild.id}`).then(s => {
      if (r == null) return;
      if (s == null) {
        member.guild.channels
          .get(r)
          .send({
            embed: {
              description: "`" + member.user.tag + "` **just left the server**"
            }
          })
          .catch(err => {
            console.log("Error Caught");
          });
      } else {
        member.guild.channels
          .get(r)
          .send({
            embed: {
              description: s
                .replace("{user}", `${member.user.tag}`)
                .replace("{members}", `${member.guild.memberCount}`)
            }
          })
          .catch(err => {
            console.log("Error Caught");
          });
      }
    });
  });
});

bot.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(".servers")) {
    return message.channel.send({
      embed: {
        title: "Bot Status",
        description: ` Users : ${bot.guilds.reduce(
          (a, g) => a + g.memberCount,
          0
        )}\nServers : ${bot.guilds.size}`,
        color: 3447003
      }
    });
  }
});

bot.on("guildCreate", guild => {
  let join = new Discord.RichEmbed()
    .setColor("GREEN")
    .setTitle("Guild Joined")
    .addField("Server Name :", guild.name)
    .addField("Server Owner :", guild.owner.user.tag)
    .setThumbnail(guild.iconURL)
    .addField("Server ID :", guild.id)
    .addField("Server Members :", guild.memberCount)
    .setTimestamp();

  bot.guilds
    .get("530693562745094144")
    .channels.get("688071501009780812")
    .send(join);
});
bot.on("guildDelete", guild => {
  let remove = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("Guild Removed")
    .addField("Server Name :", guild.name)
    .addField("Server Owner :", guild.owner.user.tag)
    .setThumbnail(guild.iconURL)
    .addField("Server ID :", guild.id)
    .addField("Server Member :", guild.memberCount)
    .setTimestamp();

  bot.guilds
    .get("530693562745094144")
    .channels.get("688071501009780812")
    .send(remove);
});
