from typing import List


class IChessEngine:

    def get_best_move(self, fen: str) -> str:
        raise NotImplementedError()
