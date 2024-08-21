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
    this.currentMove = null;
    this.loadNewBoard();
  }

  onResetClicked(): void {
    this.resetCurrentMove();
    this.initializeCurrentBoard();
  }

  private evaluateBoard() {}

  private async loadNewBoard() {
    this.resetCurrentMove();
    this.currentBoard = await this.movePredictorService.fetchRandomBoard();
    this.initializeCurrentBoard();
  }

  private resetCurrentMove() {
    this.currentMove = null;
  }

  private async initializeCurrentBoard() {
    if (!this.currentBoard) {
      return;
    }

    // Format legal moves to comply with the required format of chessground
    const dests: Map<Key, Key[]> = new Map();
    for (const move of this.currentBoard.legal_moves) {
      const moveFrom: any = move.slice(0, 2);
      const moveTo: any = move.slice(2, 4);

      const existingTargets: Key[] | undefined = dests.get(moveFrom);

      if (existingTargets) {
        dests.set(moveFrom, [...existingTargets, moveTo]);
      } else {
        dests.set(moveFrom, [moveTo]);
      }
    }

    const config = {
      fen: this.currentBoard.fen,
      orientation: this.currentBoard.is_whites_move ? colors[0] : colors[1],
      movable: {
        free: false,
        dests: dests,
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

    Chessground(boardRef, config);
  }
}
