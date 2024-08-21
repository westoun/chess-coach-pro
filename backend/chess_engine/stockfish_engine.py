import os
from stockfish import Stockfish
from typing import List

from .interface import IChessEngine


class StockfishEngine(IChessEngine):

    def __init__(self) -> None:
        engine_path = os.getenv("STOCKFISH_PATH")

        assert (
            engine_path is not None
        ), "To use StockfishEngine, STOCKFISH_PATH has to be defined."

        try:
            self.stockfish = Stockfish(
                path=engine_path,
                depth=18,
                parameters={"Threads": 2, "Minimum Thinking Time": 30},
            )
        except Exception as e:
            raise Exception(
                "Failed to initialize stockfish engine. Most likely, the specified STOCKFISH_PATH was incorrect."
            )

    def get_best_move(self, fen: str) -> str:
        if not self.stockfish.is_fen_valid(fen):
            raise ValueError(f"Stockfish received invalid fen {fen}")

        self.stockfish.set_fen_position(fen)
        best_move = self.stockfish.get_best_move()

        return best_move
