import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import Board from '../types/board';

@Injectable({
  providedIn: 'root',
})
export class MovePredictorService {
  constructor(private http: HttpClient) {}

  public async fetchRandomBoard(): Promise<Board> {
    const httpRequest = this.http
      .get(environment.movePredictor.randomBoardEndpoint)
      .pipe(map((res: any) => res));
    return lastValueFrom(httpRequest);
  }

  public async isBestMove(fenBefore: string, move: string): Promise<boolean> {
    const httpRequest = this.http
      .get(environment.movePredictor.evaluateMoveEndpoint, {
        params: {
          fen: fenBefore,
          move: move,
        },
      })
      .pipe(map((res: any) => res));
    return lastValueFrom(httpRequest);
  }
}
