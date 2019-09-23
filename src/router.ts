import express, { Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import { PassThrough } from 'stream';

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

let db: Post[] = [
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
];

router.get('/posts', (req: Request, res: Response) => {
    res.json({data: db});
});

router.get('/post/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).json({error: "wrong id"});
        return
    }
    const post = db.find((el: Post) => el.id === id);

    if (post) {
        res.json({data: post});
    } else {
        res.json({data: null});
    };

});

router.post('/post', bodyParser.json(), (req: Request, res: Response) => {
    const body: Post = req.body;
    console.log(req.body);

    if (!body.title || !body.text || !body.author) {
        res.status(400).json({error: "empty data"});
        return;
    }
    body.id = db.length + 1;
    db.push(body);
    res.status(201).json(body);
});

router.put('/post', bodyParser.json(), (req: Request, res: Response) => {
    const body: Post = req.body;

    if (!body.title || !body.text) {
        res.status(400).json({error: "empty data"});
        return;
    }

    const post = db.find((el: Post) => el.id === body.id);

    if (post) {
        db = db.filter((el: Post) => el.id !== body.id);

        post.title = body.title;
        body.text = body.text;
        body.author = body.author;

        db.push(post);
    }
    
    res.status(201).json(body);
});

router.delete('/post/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).json({error: "wrong id"});
        return;
    }
    db = db.filter((el: Post) => el.id !== id);

    res.status(200).end();

});

// router.post('/test/',  bodyParser.json(), (req: Request, res: Response) => {
//     console.log(req.body);
//     console.log(req.query);
//     res.send("Hello world ");
// });

export default router