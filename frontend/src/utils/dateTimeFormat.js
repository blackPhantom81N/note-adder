const dateTimeFormat = (utcTime) => { 
    console.log(utcTime)
    const newFormat= new Date(utcTime)
    return newFormat.toDateString()
 }

 export default dateTimeFormat