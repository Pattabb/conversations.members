// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");
fs = require('fs');


// this is the list of channels where you want to get member info
let channels = [
"CTP07RLMV",
"C01GELVAFJT",
"C015R1WUB8A",
"C74SN8C64",
"C01FMQX00DU",
"C01H34TGVBM",
"C90S0K1U7",
"CA48T6D4K",
"C7V00NE77",
"C1DAYCH3N",
"CT8AN90LS",
"C8CP3DL4T",
"C01MKEC645S",
"CC4T6HUQN",
"C1D9T1ZCJ",
"C01L5TRFBTN",
"C1EKHR535",
"CFDTN2317",
"CRHP0LH2Q",
"CE0A6UBUH",
"CH0L86ZC1",
"CTLLHJZ7W",
"CK6U1T355",
"CGPDJD807",
"C0142UM0Q95",
"C015UJB5N5D"
]

// update this - Update File path and File Name
const stream = fs.createWriteStream(`/Users/devin.parker/Desktop/TEST-ec-whole-members-jan.csv`, { 'flags': 'a' });

const web = new WebClient("UPDATE TO MATCH YOUR USER TOKEN", {
  // LogLevel can be imported and used to make debugging simpler
  // logLevel: LogLevel.DEBUG
});


getUsers().catch(err => console.log(err))

async function getUsers() {
  try {
    for (const id of channels) {
      // log progress of channels
      console.log(`calling ${id}. #${channels.indexOf(id)}.`);
      //this gets the members in the channel
      const result = await web.conversations.members({ channel: id, limit:1000 });

      // this gets the member profile fields for the channel
      for (const member of result.members) {
        // log progress of members 
        console.log(`calling ${member}. #${result.members.indexOf(member)}`);
        const user = await web.users.profile.get({ user: member })
        var title = (typeof user.profile.fields.Xf03NMAMBMGW === 'undefined') ? 0 : user.profile.fields.Xf03NMAMBMGW.value
        var dept = (typeof user.profile.fields.Xf03NTUCFHA6 === 'undefined') ? 0 : user.profile.fields.Xf03NTUCFHA6.value
        var country = (typeof user.profile.fields.Xf03P6J4BKUH === 'undefined') ? 0 : user.profile.fields.Xf03P6J4BKUH.value
        try {
          //this writes the member profile fields to a csv 
          stream.write(`${id} | ${user.profile.real_name} |  ${user.profile.email} | ${title} | ${dept} | ${country} \n `)
        } catch (error) {
          console.log(`Error : ${error} \n ${user.profile.display_name}`);
        }
      }
    }
  }
  // print number of messages
  // console.log(result[1], new Date(result[1].ts*1000));
  catch (error) {
    console.error(error)
  }
}
