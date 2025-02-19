app.get("/",async(req,res)=>{
    try {
        const result= await db.query("select * from items")
        const items=result.rows;
        const imageData=items.image_data;
        const imageUrl = `data:image/jpeg;base64,${imageData}`;

        if (imageData !== null && imageData !== undefined) {
            //const base64Image = imageUrl.toString('base64');
            res.render("index.ejs", {
                listItems: items,
                images: imageUrl,
            });
            console.log("sucessfully run");
        } else {
            console.log('Image buffer is null or undefined');
            console.log("get error while retriving");
        }

    } catch (error) {
        console.log(error);
    }
});


{/* <img src= <%= item.images %>>

<div>
    <% if (images) { %>
        <img src="data:image/jpeg;base64,<%= images %>" alt="Image"/>
    <% } else { %>
        <p>No image available</p>
    <% } %>
</div> */}