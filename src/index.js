import { app } from "./app.js";
import connectDB from "./connectDB/connectDB.js";
import { PORT } from "./util/constants.js";

const startServer = async () => {
     try {
        await connectDB();  
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
     } catch (error) {
        console.log("Server Error: ", error);
     }
}

startServer();