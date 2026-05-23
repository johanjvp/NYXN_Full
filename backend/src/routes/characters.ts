import { Router, Request, Response } from 'express';
import { rickAndMortyService } from '../services/rickAndMorty.service';
import { CharacterFilters } from '../types/character.types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const filters: CharacterFilters = {
    name: req.query['name'] as string | undefined,
    status: req.query['status'] as string | undefined,
    species: req.query['species'] as string | undefined,
    gender: req.query['gender'] as string | undefined,
    page: req.query['page'] ? Number(req.query['page']) : undefined,
  };

  try {
    const data = await rickAndMortyService.getCharacters(filters);
    res.json(data);
  } catch (error) {
    if (rickAndMortyService.isNotFoundError(error)) {
      res.status(404).json({ error: 'No characters found matching your search.' });
    } else {
      res.status(502).json({ error: 'Failed to fetch data from Rick and Morty API.' });
    }
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params['id']);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid character ID.' });
    return;
  }

  try {
    const character = await rickAndMortyService.getCharacterById(id);
    res.json(character);
  } catch (error) {
    if (rickAndMortyService.isNotFoundError(error)) {
      res.status(404).json({ error: `Character with ID ${id} not found.` });
    } else {
      res.status(502).json({ error: 'Failed to fetch data from Rick and Morty API.' });
    }
  }
});

export default router;
