import { Component, OnInit } from '@angular/core';
import { Chessground } from 'chessground';
import { Key, MoveMetadata, FEN } from 'chessground/types';
import { MovePredictorService } from '../core/services/move-predictor.service';

@Component({
  selector: 'app-move-predictor',
  templateUrl: './move-predictor.component.html',
  styleUrls: ['./move-predictor.component.scss'],
})
export class MovePredictorComponent implements OnInit {
  currentFen: FEN | null = null;

  constructor(private movePredictorService: MovePredictorService) {}

  ngOnInit(): void {
    this.loadNewBoard();
  }

  onCheckMoveClicked() {
    // fetch move
  }

  onNextClicked() {
    this.loadNewBoard();
  }

  private evaluateBoard() {}

  private async loadNewBoard() {
    this.currentFen = await this.movePredictorService.fetchRandomBoard();

    console.log(this.currentFen);

    const config = {
      fen: this.currentFen,
      movable: {
        events: {
          after: (orig: Key, dest: Key, metadata: MoveMetadata) => {
            console.log(orig, dest, metadata);
          },
        },
      },
    };
    const board = document.getElementById('board');

    if (!board) {
      console.error('no board element defined!');
      return;
    }

    const ground = Chessground(board, config);
  }
}
