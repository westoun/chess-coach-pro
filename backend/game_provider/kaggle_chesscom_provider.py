import chess
import os
import pandas
from pandas import DataFrame
import re
from typing import List

from .interface import IGameProvider


class KaggleChesscomGameProvider(IGameProvider):

    def __init__(self) -> None:
        # Uses data from https://www.kaggle.com/datasets/adityajha1504/chesscom-user-games-60000-games

        data_path = os.getenv("KAGGLE_CHESSCOM_DATA_PATH")

        assert (
            data_path is not None
        ), "To use KaggleChesscomGameProvider, KAGGLE_CHESSCOM_DATA_PATH has to be defined."

        games: DataFrame = pandas.read_csv(data_path)
        games = games.drop(
            columns=[
                "white_username",
                "black_username",
                "white_id",
                "black_id",
                "white_result",
                "black_result",
                "time_class",
                "time_control",
                "rules",
                "rated",
                "fen",
            ]
        )

        self.games = games

    def get_random_board(
        self, min_white_elo: int = 1500, min_black_elo: int = 1500, max_moves: int = 100
    ) -> str:
        relevant_games = self.games.loc[
            (self.games["white_rating"] >= min_white_elo)
            & (self.games["black_rating"] >= min_black_elo)
        ]

        if len(relevant_games) < 1:
            raise ValueError(
                f"No games left for elo values {min_white_elo} and {min_black_elo}"
            )

        random_game = relevant_games.sample(n=1)
        pgn: str = random_game["pgn"].values.tolist()[0]

        moves: str = pgn.strip().split("\n")[-1]
        moves = re.sub(r"\{[^\{\}]+\}", "", moves)  # remove time information
        moves = re.sub(r"[0-9]{,2}\.{1,3} ", "", moves)  # remove move numbers
        moves = re.sub(
            r"[0-9]+-[0-9]+", "", moves
        )  # remove result (ex. 0-1) at the end
        moves = moves.replace("  ", " ")

        move_list: List[str] = moves.strip().split()

        board = chess.Board()
        for i, move in enumerate(move_list):
            if i + 1 > max_moves:
                break

            board.push_san(move)

        return board.fen()
