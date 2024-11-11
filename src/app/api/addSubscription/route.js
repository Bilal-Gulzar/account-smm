const mailchimp = require("@mailchimp/mailchimp_marketing");


mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export const POST = async(req) => {
  const {email} = await req.json()
  console.log(email)
  try {
    const res = await mailchimp.lists.addListMember(
   process.env.MAILCHIMP_AUDIENCE_ID,{email_address:email,status:"subscribed"}
)
    return Response.json(JSON.stringify({res}));
  } catch (e) {
    return Response.json({error:e.response.text});
  }
};
