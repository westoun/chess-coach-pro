#!/usr/bin/env python3

from dotenv import load_dotenv
from fastapi import FastAPI, Response, Request
from fastapi.middleware.cors import CORSMiddleware

from chess_engine import IChessEngine, StockfishEngine
from game_provider import IGameProvider, KaggleChesscomGameProvider

load_dotenv()

chess_engine: IChessEngine = StockfishEngine()
game_provider: IGameProvider = KaggleChesscomGameProvider()

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins="http://localhost:4200", allow_methods=["*"]
)


@app.get("/move-predictor/board")
def get_random_board():
    # TODO: make sure that max_moves isn't same as EOG.
    board = game_provider.get_random_board(max_moves=21)
    return board.__dict__


@app.get("/move-predictor/evaluate")
def is_best_move(fen: str, move: str):
    best_move = chess_engine.get_best_move(fen=fen)
    return best_move == move


@app.get("/")
def read_root(request: Request):
    return 200
