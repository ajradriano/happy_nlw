import {Request, Response} from 'express'
import { getRepository } from 'typeorm';
import Orphanage from '../models/orphanage';

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            lat,
            lng,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;
        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanage = orphanagesRepository.create({
            name,
            lat,
            lng,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        });
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json({"id": orphanage.id, "status": 201});
    }
}