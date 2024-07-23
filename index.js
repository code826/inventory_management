import express from 'express';
import path from 'path';

const PORT = 8000;


const server = express();

server.use(express.static('public'));

server.get('/student')
server.delete('/student')
server.get('/test',(req,res)=>{
    //return res.sendFile(path.join(path.resolve(),'public','index.html'));
    return res.status(200).json({
        success:true,
        name:'vikas'
    });
})

server.listen(PORT,(err)=>{
    if(err){
        console.log('error',err);
        return;
    }
    console.log(`Server started at port 8000`);
})