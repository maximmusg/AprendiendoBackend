const http = require('http')
const fs = require('fs/promises')
const url = require('url')

const server = http.createServer(async (request, response) => {
    const queryObject = url.parse(request.url, true).query;
    const fileName = queryObject.file

    if(fileName){
        try {
            const data = await fs.readFile(fileName, "utf-8")
            response.writeHead(200, {"content-type" : "text/plain"})
            response.write(data)
            response.end()
        } catch (error) {
            response.writeHead(404, {"content-type" : "text/plain" })
            response.write('File not found')
            response.end()
        }
    } else {
        response.writeHead(400, {"content-type" : "text/plain" })
        response.write('Bad request: please provide a file name')
        response.end()
    }
})

const port = 3000;

server.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
})
