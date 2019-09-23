import express, { Request, Response, Router} from 'express';
import bodyParser from 'body-parser';

const router: Router = express.Router();

interface CustomRequest extends Request {
    customFieldByRuslan: string
    magic: number
}

interface Post {
    id: number
    title: string
    text: string
    author: number
}

const db: Post[] = [
    {   
        id: 1,
        title: "Title1",
        text: "Content",
        author: 1
    },
    {   
        id: 2,
        title: "Title2",
        text: "Content2",
        author: 2
    },
    {   
        id: 3,
        title: "Title3",
        text: "Content3",
        author: 1
    },
    
]

// router.put();
// router.delete();

router.get('/posts', (req: Request, res: Response) => {
    res.json({data: db})
});

router.get('/post/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
        res.status(404).json({error: "wrong id"});
        return
    }
    const post = db.find((el:Post)=> el.id === id);

    if (post) {res.json({data: post})
    } else {
        res.json({data: null})
    };

});

// router.post('/test/',  bodyParser.json(), (req: Request, res: Response) => {
//     console.log(req.body);
//     console.log(req.query);
//     res.send("Hello world ");
// });

export default router