import app from "./app";
import './database';

app.listen(process.env.PORT || 4000);

console.log('Port',4000)
