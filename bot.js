const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";

client.on("ready", () => {
  client.user.setActivity("секс-бота", { type: "PLAYING"});
  console.log("I am ready!");
});

var dds;
var tanks;
var heals;
var event_name = `Set name please`;
var event_link = ``;
var event_date = `Set date please`;
var msg;
var embed;

function fill_embed(){
	
		var dds_string = ``;
	dds.forEach(function(value, key) {
	  dds_string += value + `\n`;
	});
	if (dds_string === ``){
	  dds_string = `Here are no dds now`;
	}
	  
	var tanks_string = ``;
	tanks.forEach(function(value, key) {
	  tanks_string += value + `\n`;
	});
	if (tanks_string === ``){
	  tanks_string = `Here are no tanks now`;
	}
	  
	var heals_string = ``;
	heals.forEach(function(value, key) {
	  heals_string += value + `\n`;
	});
	if (heals_string === ``){
	  heals_string = `Here are no heals now`;
	}
	
	
	embed = new Discord.RichEmbed()
	  .setAuthor("Raid Planner", "https://us.v-cdn.net/5020507/uploads/bf47ba6b81f347a352defdda0e8d80d5.png")
	  .setDescription("Dro-m'Athra Squad timetable")
	  .setThumbnail("https://i2.wp.com/www.salsaddictos.ch/wp-content/uploads/2015/02/flat_20141016_1733187833.png?w=160")
	  .addField("Событие", `[${event_name}](${event_link})`, true)
	  .addField("Дата", event_date, true)
	  .setColor(0x00AE86)
	  .setFooter("Timetable bot by ILDaR_F")
	  .setTimestamp()
	  //.addField(`\u200b`, "```prolog\n Состав\n```")
	  .setImage("https://esosslfiles-a.akamaihd.net/cms/2018/05/69f5ef98dbea22474cbe6e9232f7f561.jpg")
	  .addField("Tanks:", tanks_string)
	  .addField("Heals:", heals_string)
	  .addField("DDs:", dds_string);
	return embed;
}

function editEmbed(){

	embed = fill_embed();
	msg.then((msg)=>{
      msg.edit({embed});
	});
}

client.on("message", (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (message.author.bot) return;
  if (!(message.author.id === `361216535932698627`)) return;
  
  switch (command) {
    case "create" :
	  message.delete()
	  dds = new Map();
	  tanks = new Map();
	  heals = new Map();
	  event_name = `Set name please`;
	  event_link = ``;
      event_date = `Set date please`;
	  
	  embed = fill_embed();
      msg = message.channel.send({embed});
	  break;
	case "clone":
      embed = fill_embed();	
	  msg = message.channel.send({embed});
	  break;
	
	case "add_dds" :
	  message.delete()
	  args.forEach(function(item) {
	    dds.set(item, item);
	  });
	  editEmbed();
	  break;
	  
	case "add_tanks" :
	  message.delete()
	  args.forEach(function(item) {
	    tanks.set(item, item);
	  });
	  editEmbed();
	  break;
	  
	case "add_heals" :
	  message.delete()
	  args.forEach(function(item) {
	    heals.set(item, item);
	  });
	  editEmbed();
	  break;
	  
	case "del_dds":
	  message.delete()
	  args.forEach(function(item) {
	    dds.delete(item);
	  });
	  editEmbed();
	  break;
	  
	case "del_tanks":
	  message.delete()
	  args.forEach(function(item) {
	    tanks.delete(item);
	  });
	  editEmbed();
	  break;
	  
	case "del_heals":
	  message.delete()
	  args.forEach(function(item) {
	    heals.delete(item);
	  });
	  editEmbed();
	  break;
	  
	case "del":
	  message.delete()
	  args.forEach(function(item) {
	    dds.delete(item);
	  });
	  args.forEach(function(item) {
	    heals.delete(item);
	  });
	  args.forEach(function(item) {
	    tanks.delete(item);
	  });
	  editEmbed();
	  break;
	  
	case "name":
	  message.delete()
	  event_name = args.join(` `);
	  editEmbed();
	  break;
	  
	case "link":
	  message.delete()
	  event_link = args.join(` `);
	  editEmbed();
	  break;
	case "date":
	  message.delete()
	  event_date = args.join(` `);
	  editEmbed();
	  break;
	  
	case "set":
	  message.delete()
	  let name = args[0];
	  if (dds.has(name)){
		  dds.set(name, args.join(` `));
	  }
	  if (tanks.has(name)){
		  tanks.set(name, args.join(` `));
	  }
	  if (heals.has(name)){
		  heals.set(name, args.join(` `));
	  }
	  editEmbed();
	  break;
	  
	case "setn":
	  message.delete()
	  var num = args[0];
	  var n = parseInt(num, 10);
	  var text = args.slice(n+1).join(` `);
	  for (i = 1; i <= n; i++) {
        let name = args[i];
		let new_text = name + ` ` + text;
		if (dds.has(args[i])){
		  dds.set(name, new_text);
	    }
	    if (tanks.has(name)){
		  tanks.set(name, new_text);
	    }
	    if (heals.has(name)){
		  heals.set(name, new_text);
	    }
	  }
	  editEmbed();
	  break;
	  
	  
    }
});




client.login(process.env.BOT_TOKEN);
