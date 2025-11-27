import { timeStamp } from 'console'
import fs from 'fs'
import path from 'path'


export const joyasLog = (req, res, next) => {
    const logPath = path.resolve('joyasLog.json')
    
    const newLog = {
        timestamp: timeStamp(),
        method: req.method,
        url: req.url,
        body: req.body,
        query: req.query,
        params: req.params,
    }

    let logs = []
    if (fs.existsSync(logPath)) {
        const fileContent = fs.readFileSync(logPath)
        logs = JSON.parse(fileContent)
    }

    logs.push(newLog)

    fs.writeFileSync(logPath, JSON.stringify(logs))

    next()
}