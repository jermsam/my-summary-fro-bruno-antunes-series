  
const sqlite = require('sqlite');
const sqlite3=require('sqlite3');

// you would have to import / invoke this in another file
(async () =>{
 try{
    const db = await sqlite.open({
        filename: 'cars.sqlite',
        driver: sqlite3.Database
      })
    
      await db.migrate({force:true})
    
      const  faq =await db.all('select * from Faq order by createDate DESC')
      console.log('ALL FAQs: ',JSON.stringify(faq,null,4))

      const cars =await db.all('select * from Car')
      console.log('ALL CARS: ',JSON.stringify(cars,null,4))
 }catch({message}){
     console.log('Err: ',message)
 }
  
})()

