import { Request, Router, Response } from "express";
import starsData from "../data/stars.json"
import Joi from 'joi';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
    const type = req.query.type as string
    let stars = starsData
    if (type) {
        stars = starsData.filter((star) => star.type.includes(type))
    }
    res.status(200).json(stars)
})

router.get('/stars', (req: Request, res: Response) => {
    const name = req.params.name
    const star = starsData.find((star) => star.name === name)
    if (!star) {
        res.status(404).json({
            error: 'Estrella no registrada',
            message: `La estrella seleccionada ${name} no está registrada en la base de datos`,
        })
        res.status(200).json(star)
    }
})

/* ESQUEMA POST CON -- JOI REQUIRED -- */
const starEsquema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    distancia: Joi.string().required(),
    mass: Joi.string().required(),
    radius: Joi.string().required(),
    temperature: Joi.string().required(),
    luminosity: Joi.string().required(),
    age: Joi.string().required(),
    composition: Joi.object({
        hydrogen: Joi.string().required(),
        helium: Joi.string().required(),
        otros_elementos: Joi.string().required(),
    }).required(),
    stellar_history: Joi.string().required(),
});

router.post('/stars', (req: Request, res: Response) => {
    const newStar = req.body;
    const { error } = starEsquema.validate(newStar);
    if (error) {
        res.status(404).json({
            error: error.details[0].message
        })
    } else {
        res.status(200).json({
            status: "OK"
        });
    }
})

router.get('/stars/:id', (req: Request, res: Response) => {
    const starId = parseInt(req.params.id);
    const star = starsData.find((star) => starId === star.id)
    if (!star) {
        return res.status(404).json({
            error: 'Estrella no registrada',
            message: `La estrella seleccionada ${starId} no está registrada en la base de datos`,
        })
    }
    res.status(200).json(star)
})
