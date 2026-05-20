import { detectRuntime } from "../runtimes/runtime-detect.js";
export function doctor(){ const rt=detectRuntime(); return { runtime: rt.kind, node: process.version }; }
