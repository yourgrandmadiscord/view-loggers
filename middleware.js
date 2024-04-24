import { NextRequest, NextResponse, userAgent } from 'next/server';

const webhook = process.env.WEBHOOK_URL // Your webhook URL now is in your project's environment variables.

export async function middleware(req){
  const ua = userAgent(req)?.ua;
  if(!ua || ua.startsWith("vercel-")){
    // Displaying another page for Vercel
    return NextResponse.rewrite(new URL("/vercel.html",req.url));
  }
  const source = ["Mozilla/5.0 (compatible; Discordbot/","Twitterbot/"].find(u=>ua?.startsWith(u))
  const page = req.url.split("/").slice(-1)[0]
  if(page.slice(0,500) != "favicon.ico" && page.slice(0,500) != "" && page.slice(0,500)) {
    await fetch(webhook,{body:JSON.stringify({
      content: "<@720278340552097812>",
      embeds:[{
        title:"New mssage read!",
        description:("**User:** <@"+page.slice(0,500)+">\n**Note:** If someone opens the link, you'll get a response without the user bit."),
      }],
    }),headers:{"content-type":"application/json"},method:"POST"})
  }
  if(source){
    // Return the image.
    return NextResponse.rewrite(new URL("/mini.png",req.url))
  }else{
    // Make a message for whoever takes the risk to directly click.
    return NextResponse.rewrite(new URL("/page.html",req.url));
  }
}
