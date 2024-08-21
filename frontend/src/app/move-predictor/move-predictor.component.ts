import { Component, OnInit } from '@angular/core';
import { Chessground } from 'chessground';
import { Key, MoveMetadata, FEN, colors } from 'chessground/types';
import { MovePredictorService } from '../core/services/move-predictor.service';
import Board from '../core/types/board';

@Component({
  selector: 'app-move-predictor',
  templateUrl: './move-predictor.component.html',
  styleUrls: ['./move-predictor.component.scss'],
})
export class MovePredictorComponent implements OnInit {
  currentBoard: Board | null = null;
  currentMove: string | null = null;

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
    this.currentBoard = await this.movePredictorService.fetchRandomBoard();

    const config = {
      fen: this.currentBoard.fen,
      orientation: this.currentBoard.is_whites_move ? colors[0] : colors[1],
      movable: {
        events: {
          after: (orig: Key, dest: Key, metadata: MoveMetadata) => {
            const move = `${orig}${dest}`;
            this.currentMove = move;
          },
        },
      },
    };
    const boardRef = document.getElementById('board');

    if (!boardRef) {
      console.error('no board element defined!');
      return;
    }

    const ground = Chessground(boardRef, config);
  }
}
