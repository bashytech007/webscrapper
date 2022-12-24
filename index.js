const puppeteer=require('puppeteer');


const fs=require('fs');
//has to be an Asynchronus function because u don't know  whether the respsonse will be
//resolved or rejected
async function run(){
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto('https://my-p-brown.vercel.app/');
// for a screen shot of the website
    // await page.screenshot({path:'todayseries.png',fullPage:true});
    //this to get a pdf of the url in the goto method and the format of course a4
    // await page.pdf({path:'mussolini.pdf',format:'A4'});
    //this code below is to get the HTML elements of the site above 
    // const inside=await page.content();
    // console.log(inside);
    // the code below uses the page.evaluate HOC to get the title of the url above
    // const title=await page.evaluate(()=>document.title);
    // the code below also uses the page.evaluate HOC to get the text of the url 
    // const text=await page.evaluate(()=>document.body.innerText)
    //    console.log(text);
    // const links=await page.evaluate(()=>
    // Array.from(document.querySelectorAll('a'),(e)=>e.href));
   
    // console.log(links);
    //using the array.from method u can iteratethrough and create a shallow copy  ubongs site above and get the name his projects and the links ofcourse u have to inspect is site
    // const projects =await page.evaluate(()=>
    // Array.from(document.querySelectorAll('#project .sub_project'),(e)=>({
    //     title: e.querySelector('.view h3').innerText,
    //     url:e.querySelector('.view a').href
    // })))
    ////using the map method u can map ubongs site above and get the name his projects and the links ofcourse u have to inspect is site
   const projects=await page.$$eval('#project .sub_project',(elements)=>elements.map(e=>({
             title: e.querySelector('.view h3').innerText,
             url:e.querySelector('.view a').href
   })));
    console.log(projects)
    
    //save data to JSON file using the fs module
    fs.writeFile('projects.json',JSON.stringify(projects),(err)=>{
        if(err) throw err;
        console.log('File saved')
    })

    await browser.close();
}
run();