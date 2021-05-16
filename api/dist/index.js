const express = require("express");
const compression = require("compression");
const app = express();
app.get("/", (request, response) => {
    console.log("Working");
});
app.listen(8080, () => {
    console.log("Example app listening at http://localhost:8080");
});
//# sourceMappingURL=index.js.map