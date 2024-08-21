from typing import List


class IGameProvider:

    def get_random_board(
        self, min_white_elo: int = 1500, min_black_elo: int = 1500, max_moves: int = 100
    ) -> str:
        raise NotImplementedError()
