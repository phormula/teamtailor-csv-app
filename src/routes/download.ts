import { Request, Response, Router } from 'express';
import { json2csv } from 'json-2-csv';
import { fetchAllCandidates, processCandidateData } from '../services/Api.service';
import { CandidateData } from '../types/candidate.type';

const router = Router();

router.get('/download', async (req: Request, res: Response) => {
  try {
    const paginatedCandidates = await fetchAllCandidates();

    let csvCandidates: CandidateData[] = [];
    for (const candidates of paginatedCandidates) {
      const candidateData = processCandidateData(candidates);
      csvCandidates = [...csvCandidates, ...candidateData];
    }

    const csv = json2csv(csvCandidates);

    res.header('Content-Type', 'text/csv');
    res.attachment('candidates.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    res.status(500).send('An error occurred while generating the CSV file.');
  }
});

export default router;
