#!/usr/bin/env python3

from fastapi import FastAPI, Response, Request

app = FastAPI()

@app.get("/")
def read_root(request: Request):
    return 200