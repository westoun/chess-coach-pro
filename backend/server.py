#!/usr/bin/env python3

from dotenv import load_dotenv
from fastapi import FastAPI, Response, Request

from chess_engine import IChessEngine, StockfishEngine

load_dotenv()

app = FastAPI()
chess_engine: IChessEngine = StockfishEngine()


@app.get("/")
def read_root(request: Request):
    return 200
