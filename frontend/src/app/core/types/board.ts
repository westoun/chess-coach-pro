export default interface Board {
  fen: string;
  is_whites_move: boolean;
  legal_moves: string[];
}
