from dataclasses import dataclass
from typing import List


@dataclass
class Board:
    fen: str
    is_whites_move: bool
    legal_moves: List[str]
